'use server';

import type { HobbaGroup } from '@prisma/client';

import { prisma } from '@/lib/db';
import { fetchHabboUserInfo } from '@/server/actions/habbo/user/fetch-user-data';

export async function addHobbaMember(name: string, hobbaGroup: HobbaGroup) {
  try {
    const userInfo = await fetchHabboUserInfo(name);
    if (userInfo.error) {
      return { success: false, error: userInfo.error };
    }

    await prisma.hobba.create({
      data: {
        name: userInfo.data!.name,
        imageUrl: `https://www.habbo.es/habbo-imaging/avatarimage?&figure=${userInfo.data!.figureString}`,
        hobbaGroup,
        lastOnline: new Date(userInfo.data!.lastAccessTime),
        accountCreatedAt: new Date(userInfo.data!.memberSince),
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add hobba member' };
  }
}

export async function removeHobbaMember(username: string) {
  try {
    const dbHobba = await prisma.hobba.findUnique({
      where: { name: username },
    });

    if (!dbHobba) {
      return { success: false, error: 'Hobba not found' };
    }

    await prisma.hobba.delete({
      where: { id: dbHobba.id },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove hobba member' };
  }
}

export async function updateAllHobbaData() {
  try {
    const hobbas = await prisma.hobba.findMany();

    if (hobbas.length === 0) {
      return { success: false, error: 'No hobbas found' };
    }

    const updatePromises = hobbas.map(async (hobba) => {
      const userInfo = await fetchHabboUserInfo(hobba.name);
      if (userInfo.error || !userInfo.data) {
        return {
          name: hobba.name,
          error: userInfo.error || 'Failed to fetch hobba data',
        };
      }

      try {
        const updatedHobba = await prisma.hobba.update({
          where: { id: hobba.id },
          data: {
            imageUrl: `https://www.habbo.es/habbo-imaging/avatarimage?&figure=${userInfo.data.figureString}`,
            lastOnline: userInfo.data.online ? new Date() : hobba.lastOnline, // Update lastOnline only if user is currently online
            updatedAt: new Date(),
          },
        });
        return { success: true, hobba: updatedHobba };
      } catch (updateError) {
        return { name: hobba.name, error: 'Failed to update hobba data' };
      }
    });

    const results = await Promise.all(updatePromises);

    const updatedHobbas = results
      .filter((result) => result.success)
      .map((result) => result.hobba);
    const errors = results.filter((result) => !result.success);

    return {
      success: true,
      updatedCount: updatedHobbas.length,
      errorCount: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    return { success: false, error: 'Failed to update hobba data' };
  }
}
