import React from 'react';

import { Loader2 } from 'lucide-react';

import { Progress } from '@/components/ui/progress';

export function LoadingSkeleton() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-8">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-lg font-semibold">Loading user data...</p>
      <div className="w-[60%]">
        <Progress value={progress} />
      </div>
    </div>
  );
}
