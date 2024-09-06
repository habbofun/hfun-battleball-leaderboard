import React from 'react';

import { CircleIcon } from 'lucide-react';

interface StatusBadgeProps {
  label: string;
  status: boolean;
}

export function StatusBadge({ label, status }: StatusBadgeProps) {
  return (
    <div className="flex items-center space-x-2">
      <CircleIcon
        className={`w-3 h-3 ${status ? 'text-green-500' : 'text-red-500'}`}
      />
      <span className="text-sm font-medium">
        {label}: {status ? 'Yes' : 'No'}
      </span>
    </div>
  );
}
