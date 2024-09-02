import { Skeleton } from '@/components/ui/skeleton';

export function CountdownTimerSkeleton() {
  return (
    <div className="text-center mb-4">
      <Skeleton className="h-4 w-32" /> {/* Label skeleton */}
      <Skeleton className="h-8 w-24" /> {/* Timer skeleton */}
      <Skeleton className="h-4 w-48" /> {/* Info skeleton */}
    </div>
  );
}
