import { create } from 'zustand';

import { Hobba } from '@/types/hobba';

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
