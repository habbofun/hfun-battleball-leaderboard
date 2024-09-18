import type { Hobba, HobbaGroup } from '@prisma/client';

import { localApiClient } from '@/lib/api';

export const fetchAndSortHobbas = async (): Promise<[string, Hobba[]][]> => {
  const response = await localApiClient.get('/api/habbo/hobbas');

  if (!response.data.success) {
    throw new Error('Failed to fetch hobbas');
  }

  const hobbas: Hobba[] = response.data.data;
  return sortHobbasByGroup(hobbas);
};

const sortHobbasByGroup = (hobbas: Hobba[]): [string, Hobba[]][] => {
  const groupedHobbas = hobbas.reduce<Record<HobbaGroup, Hobba[]>>(
    (acc, hobba) => {
      const group = hobba.hobbaGroup;
      if (!acc[group]) acc[group] = [];
      acc[group].push(hobba);
      return acc;
    },
    {} as Record<HobbaGroup, Hobba[]>,
  );

  return Object.entries(groupedHobbas).sort(([groupA], [groupB]) => {
    if (groupA === 'GOLD') return -1;
    if (groupB === 'GOLD') return 1;
    return groupA.localeCompare(groupB);
  }) as [string, Hobba[]][];
};
