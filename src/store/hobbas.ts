import { create } from 'zustand';

import { fetchAndSortHobbas } from '@/services/hobba';
import type { HobbaState } from '@/types/hobba';

export const useHobbasStore = create<HobbaState>((set) => ({
  loading: false,
  hobbasList: [],

  fetchHobbas: async () => {
    set({ loading: true });

    try {
      const sortedHobbas = await fetchAndSortHobbas();
      set({ hobbasList: sortedHobbas, loading: false });
    } catch (error) {
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
