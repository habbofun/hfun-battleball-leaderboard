import { create } from 'zustand';

import { fetchAndSortTeamMembers } from '@/services/team';
import type { TeamState } from '@/types/team';

export const useTeamStore = create<TeamState>((set) => ({
  loading: false,
  teamList: [],

  fetchTeamMembers: async () => {
    set({ loading: true });

    try {
      const sortedTeamMembers = await fetchAndSortTeamMembers();
      set({ teamList: sortedTeamMembers, loading: false });
    } catch (error) {
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
