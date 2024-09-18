import React from 'react';

import { Loader2 } from 'lucide-react';

interface LoaderProps {
  text?: string;
  size?: number;
  className?: string;
}

export function Loader({
  text = 'Loading...',
  size = 8,
  className = '',
}: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 ${className}`}
    >
      <Loader2 className={`h-${size} w-${size} animate-spin`} />
      {text && (
        <p className="text-sm font-medium text-muted-foreground">{text}</p>
      )}
    </div>
  );
}
