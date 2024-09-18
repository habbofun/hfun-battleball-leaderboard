import type { Hobba } from '@prisma/client';

export interface HobbaState {
  loading: boolean;
  hobbasList: [string, Hobba[]][];
  fetchHobbas: () => Promise<void>;
}
