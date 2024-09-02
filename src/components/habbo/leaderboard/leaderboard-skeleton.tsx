import { Skeleton } from '@/components/ui/skeleton';

export function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex space-x-2">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 flex-grow" />
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-24" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full" /> {/* Pagination skeleton */}
    </div>
  );
}
