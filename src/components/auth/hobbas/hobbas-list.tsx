'use client';

import { useHobbasStore } from '@/store/hobbas';

export const HobbasList = () => {
  const hobbas = useHobbasStore((state) => state.hobbas);
  console.log('Got hobbas on component: ', hobbas);

  if (hobbas.length === 0) {
    return <div>No hobbas found</div>;
  }

  return (
    <div>
      <h1>Hobbas</h1>
      <ul>
        {hobbas.map((hobba) => (
          <li key={hobba.id}>{hobba.name}</li>
        ))}
      </ul>
    </div>
  );
};
