import type { TeamMember } from '@prisma/client';

import { localApiClient } from '@/lib/api';

export const fetchAndSortTeamMembers = async (): Promise<
  [string, TeamMember[]][]
> => {
  const response = await localApiClient.get('/api/team/team');

  if (!response.data.success) {
    throw new Error('Failed to fetch team members');
  }

  const teamMembers: TeamMember[] = response.data.data;
  return sortTeamMembersByRole(teamMembers);
};

const sortTeamMembersByRole = (
  teamMembers: TeamMember[],
): [string, TeamMember[]][] => {
  const groupedMembers = teamMembers.reduce<Record<string, TeamMember[]>>(
    (acc, member) => {
      const role = member.role;
      if (!acc[role]) acc[role] = [];
      acc[role].push(member);
      return acc;
    },
    {},
  );

  return Object.entries(groupedMembers).sort(([roleA], [roleB]) => {
    const roleOrder = ['Owner', 'Admin', 'Moderator', 'Helper'];
    return roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB);
  });
};
