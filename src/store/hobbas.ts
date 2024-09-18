import { create } from 'zustand';

import { fetchAndSortHobbas } from '@/services/hobba';
import type { HobbaState } from '@/types/hobba';

export const useHobbasStore = create<HobbaState>((set) => ({
  loading: false,
  hobbasList: [],
  Actions: {
    fetchHobbas: async () => {
      set({ loading: true });
      try {
        const sortedHobbas = await fetchAndSortHobbas();
        set({ hobbasList: sortedHobbas, loading: false });
      } catch (error) {
        console.error('Failed to fetch hobbas:', error);
      } finally {
        set({ loading: false });
      }
    },
  },
}));
