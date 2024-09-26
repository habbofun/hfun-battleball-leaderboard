'use server';

import type { TeamRole } from '@prisma/client';

import { prisma } from '@/lib/db';
import { fetchHabboUserInfo } from '@/server/actions/habbo/user/fetch-user-data';

export async function addTeamMember(name: string, role: TeamRole) {
  try {
    const userInfo = await fetchHabboUserInfo(name);
    if (userInfo.error) {
      return { success: false, error: userInfo.error };
    }

    const user = await prisma.user.findFirst({
      where: { habboVerifiedUsername: name },
    });

    if (!user) {
      return { success: false, error: 'Verified user not found' };
    }

    const teamMember = await prisma.teamMember.findFirst({
      where: { userId: user.id },
    });

    if (teamMember) {
      return { success: false, error: 'Team member already exists' };
    }

    await prisma.teamMember.create({
      data: {
        name: userInfo.data!.name,
        motto: userInfo.data!.motto,
        imageUrl: `https://www.habbo.es/habbo-imaging/avatarimage?&figure=${userInfo.data!.figureString}`,
        role: role,
        lastOnline: new Date(userInfo.data!.lastAccessTime),
        accountCreatedAt: new Date(userInfo.data!.memberSince),
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add team member' };
  }
}

export async function removeTeamMember(username: string) {
  try {
    const dbTeamMember = await prisma.teamMember.findUnique({
      where: { name: username },
    });

    if (!dbTeamMember) {
      return { success: false, error: 'Team member not found' };
    }

    await prisma.teamMember.delete({
      where: { id: dbTeamMember.id },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove team member' };
  }
}

export async function updateAllTeamMemberData() {
  try {
    const teamMembers = await prisma.teamMember.findMany();

    if (teamMembers.length === 0) {
      console.warn('No team members found');
      return { success: false, error: 'No team members found' };
    }

    const updatePromises = teamMembers.map(async (member) => {
      const userInfo = await fetchHabboUserInfo(member.name);
      if (userInfo.error || !userInfo.data) {
        console.warn(`Failed to fetch team member data for ${member.name}`);
        return {
          name: member.name,
          error: userInfo.error || 'Failed to fetch team member data',
        };
      }

      try {
        const updatedMember = await prisma.teamMember.update({
          where: { id: member.id },
          data: {
            motto: userInfo.data.motto,
            imageUrl: `https://www.habbo.es/habbo-imaging/avatarimage?&figure=${userInfo.data.figureString}`,
            lastOnline: userInfo.data.online ? new Date() : member.lastOnline,
            updatedAt: new Date(),
          },
        });
        return { success: true, member: updatedMember };
      } catch (updateError) {
        console.warn(`Failed to update team member data for ${member.name}`);
        return {
          name: member.name,
          error: 'Failed to update team member data',
        };
      }
    });

    const results = await Promise.all(updatePromises);

    const updatedMembers = results
      .filter((result) => result.success)
      .map((result) => result.member);
    const errors = results.filter((result) => !result.success);

    console.log(
      `Updated ${updatedMembers.length} team member data, with ${errors.length} errors`,
    );

    return {
      success: true,
      updatedCount: updatedMembers.length,
      errorCount: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    return { success: false, error: 'Failed to update team member data' };
  }
}
