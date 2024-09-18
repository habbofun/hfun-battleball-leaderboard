import type { Hobba } from '@prisma/client';
import { create } from 'zustand';

interface HobbaState {
  hobbas: Hobba[];
  setHobbas: (hobbas: Hobba[]) => void;

  fetchHobbas: () => void;
}

export const useHobbasStore = create<HobbaState>((set) => ({
  hobbas: [],
  selectedHobba: null,
  setHobbas: (hobbas: Hobba[]) => set({ hobbas }),

  fetchHobbas: () => {
    console.log('Fetching Hobbas from zustand function');
  },
}));
