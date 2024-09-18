import type { Hobba, HobbaGroup } from '@prisma/client';
import { create } from 'zustand';

import { localApiClient } from '@/lib/api';
import type { HobbaState } from '@/types/hobba';

export const useHobbasStore = create<HobbaState>((set) => ({
  loading: false,
  hobbasList: [],

  fetchHobbas: async () => {
    set({ loading: true });
    try {
      const response = await localApiClient.get('/api/habbo/hobbas');

      if (!response.data.success) {
        set({ loading: false });
        return;
      }

      const hobbas: Hobba[] = response.data.data;

      // Group and sort hobbas
      const groupedHobbas = hobbas.reduce<Record<HobbaGroup, Hobba[]>>(
        (acc, hobba) => {
          const group = hobba.hobbaGroup;
          if (!acc[group]) acc[group] = [];
          acc[group].push(hobba);
          return acc;
        },
        {} as Record<HobbaGroup, Hobba[]>,
      );

      const sortedGroups = Object.entries(groupedHobbas).sort(
        ([groupA], [groupB]) => {
          if (groupA === 'GOLD') return -1;
          if (groupB === 'GOLD') return 1;
          return groupA.localeCompare(groupB);
        },
      );

      set({ hobbasList: sortedGroups as [string, Hobba[]][], loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
