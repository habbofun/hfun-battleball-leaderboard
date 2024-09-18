import type { Hobba } from '@prisma/client';
import { GemIcon, StarIcon } from 'lucide-react';

import { HobbaCard } from './hobba-card';

interface HobbaGroupProps {
  group: string;
  hobbas: Hobba[];
}

export const HobbaGroup = ({ group, hobbas }: HobbaGroupProps) => (
  <div>
    <h2 className="text-xl font-bold mb-4 flex items-center">
      {group === 'GOLD' ? (
        <StarIcon className="mr-2 text-yellow-500 w-5 h-5" />
      ) : (
        <GemIcon className="mr-2 text-gray-400 w-5 h-5" />
      )}
      {group}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {hobbas.map((hobba) => (
        <HobbaCard key={hobba.id} hobba={hobba} />
      ))}
    </div>
  </div>
);
