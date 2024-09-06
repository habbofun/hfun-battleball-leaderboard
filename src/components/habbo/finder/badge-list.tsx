import React from 'react';

import { BadgeCheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface BadgeListProps {
  badges: Array<{
    badgeIndex: number;
    code: string;
    name: string;
    description: string;
  }>;
}

export function BadgeList({ badges }: BadgeListProps) {
  return (
    <div>
      <h4 className="font-semibold text-xl mb-4 flex items-center">
        <BadgeCheckIcon className="w-6 h-6 mr-2" />
        Badges
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <Badge
            key={badge.badgeIndex}
            variant="secondary"
            className="p-3 text-sm flex items-center space-x-2"
          >
            <BadgeCheckIcon className="w-4 h-4" />
            <span
              className="truncate"
              title={`${badge.name} - ${badge.description}`}
            >
              {badge.name} - {badge.description}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
