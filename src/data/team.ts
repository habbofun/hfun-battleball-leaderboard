import type { TeamMember } from '@prisma/client';

import db from '@/lib/db';

export async function getTeamMember(
  username: string,
): Promise<{ success: boolean; data?: TeamMember; message?: string }> {
  const dbTeamMember = await db.teamMember.findFirst({
    where: { name: username },
  });

  if (!dbTeamMember) {
    return { success: false, message: 'Team member not found' };
  }

  const teamMember = {
    id: dbTeamMember.id,
    name: dbTeamMember.name,
    motto: dbTeamMember.motto,
    imageUrl: dbTeamMember.imageUrl,
    role: dbTeamMember.role,
    lastOnline: dbTeamMember.lastOnline,
    accountCreatedAt: dbTeamMember.accountCreatedAt,
    updatedAt: dbTeamMember.updatedAt,
    userId: dbTeamMember.userId,
  };

  return { success: true, data: teamMember };
}

export async function getAllTeamMembers(): Promise<{
  success: boolean;
  data?: TeamMember[];
  message?: string;
}> {
  const dbTeamMembers = await db.teamMember.findMany();

  if (!dbTeamMembers || dbTeamMembers.length === 0) {
    return { success: false, message: 'No team members found' };
  }

  const teamMembers = dbTeamMembers.map((member) => ({
    id: member.id,
    name: member.name,
    motto: member.motto,
    imageUrl: member.imageUrl,
    role: member.role,
    lastOnline: member.lastOnline,
    accountCreatedAt: member.accountCreatedAt,
    updatedAt: member.updatedAt,
    userId: member.userId,
  }));

  return { success: true, data: teamMembers };
}
