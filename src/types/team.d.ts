import type { TeamMember } from '@prisma/client';

export interface TeamState {
  loading: boolean;
  teamList: [string, TeamMember[]][];
  fetchTeamMembers: () => Promise<void>;
}
