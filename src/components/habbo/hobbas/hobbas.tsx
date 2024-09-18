'use client';

import { useEffect } from 'react';

import { useHobbasStore } from '@/store/hobbas';

import { HobbaGroup } from './list/hobba-group';
import { HobbaListSkeleton } from './list/hobba-list-skeleton';

export const HobbasList = () => {
  const { hobbasList, fetchHobbas, loading } = useHobbasStore();

  useEffect(() => {
    fetchHobbas();
  }, [fetchHobbas]);

  if (loading) return <HobbaListSkeleton />;
  if (hobbasList.length === 0)
    return (
      <div className="text-center text-muted-foreground">No hobbas found</div>
    );

  return (
    <div className="space-y-8">
      {hobbasList.map(([group, hobbas]) => (
        <HobbaGroup key={group} group={group} hobbas={hobbas} />
      ))}
    </div>
  );
};
