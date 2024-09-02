import { Skeleton } from '@/components/ui/skeleton';

export function PageHeaderSkeleton() {
  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-32" /> {/* Title skeleton */}
          <Skeleton className="h-6 w-12" /> {/* Badge skeleton */}
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10" /> {/* Toggle skeleton */}
          <Skeleton className="h-10 w-10" /> {/* Menu skeleton */}
        </div>
      </div>
    </header>
  );
}
