import type { Hobba } from '@prisma/client';
import { create } from 'zustand';

import { localApiClient } from '@/lib/api';

interface HobbaState {
  hobbas: Hobba[];
  loading: boolean;
  fetchHobbas: () => Promise<void>;
}

export const useHobbasStore = create<HobbaState>((set) => ({
  hobbas: [],
  loading: false,

  fetchHobbas: async () => {
    set({ loading: true });
    try {
      const response = await localApiClient.get('/api/habbo/hobbas');

      if (!response.data.success) {
        return;
      }

      set({ hobbas: response.data.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
