'use server';

import { HobbaGroup } from '@prisma/client';

import { prisma } from '@/lib/db';
import { fetchHabboUserInfo } from '@/server/actions/habbo/fetch-user-data';

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

export async function removeHobbaMember(id: string) {
  try {
    await prisma.hobba.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove hobba member' };
  }
}
