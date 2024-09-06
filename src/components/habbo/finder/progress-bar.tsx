import React from 'react';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 ${className}`}
    >
      <Progress value={progress} className="w-full sm:w-auto sm:flex-grow" />
      {showLabel && (
        <span className="text-sm font-medium whitespace-nowrap">
          {progress}%
        </span>
      )}
    </div>
  );
}
