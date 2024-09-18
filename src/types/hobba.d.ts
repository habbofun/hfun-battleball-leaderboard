import type { Hobba } from '@prisma/client';

export interface HobbaState {
  loading: boolean;
  hobbasList: [string, Hobba[]][];
  Actions: {
    fetchHobbas: () => Promise<void>;
  };
}
