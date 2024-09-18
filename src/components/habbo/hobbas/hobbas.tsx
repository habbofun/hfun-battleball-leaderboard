'use client';

import { useEffect } from 'react';

import type { Hobba } from '@prisma/client';

import { useHobbasStore } from '@/store/hobbas';

import { HobbaGroup } from './list/hobba-group';
import { HobbaListSkeleton } from './list/hobba-list-skeleton';

export const HobbasList = () => {
  const { hobbas, fetchHobbas, loading } = useHobbasStore();

  useEffect(() => {
    fetchHobbas();
  }, [fetchHobbas]);

  if (loading) return <HobbaListSkeleton />;
  if (hobbas.length === 0)
    return (
      <div className="text-center text-muted-foreground">No hobbas found</div>
    );

  const groupedHobbas = hobbas.reduce(
    (acc, hobba) => {
      const group = hobba.hobbaGroup;
      if (!acc[group]) acc[group] = [];
      acc[group].push(hobba);
      return acc;
    },
    {} as Record<string, Hobba[]>,
  );

  const sortedGroups = Object.entries(groupedHobbas).sort(
    ([groupA], [groupB]) => {
      if (groupA === 'GOLD') return -1;
      if (groupB === 'GOLD') return 1;
      return groupA.localeCompare(groupB);
    },
  );

  return (
    <div className="space-y-8">
      {sortedGroups.map(([group, groupHobbas]) => (
        <HobbaGroup key={group} group={group} hobbas={groupHobbas} />
      ))}
    </div>
  );
};
