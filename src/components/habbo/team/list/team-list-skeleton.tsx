import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const TeamListSkeleton = () => (
  <div className="space-y-8">
    {[...Array(2)].map((_, groupIndex) => (
      <div key={groupIndex}>
        <Skeleton className="h-6 w-32 mb-4" /> {/* Role title */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, cardIndex) => (
            <Card key={cardIndex} className="p-4 flex flex-col items-center">
              <Skeleton className="h-5 w-3/4 mb-4" /> {/* Member name */}
              <Skeleton className="h-24 w-24 rounded-full mb-4" />{' '}
              {/* Member image */}
              <Skeleton className="h-12 w-full mb-4" /> {/* Motto */}
              <Skeleton className="h-4 w-16 mb-4" /> {/* Badge */}
              <div className="w-full space-y-1 mt-auto">
                <Skeleton className="h-3 w-full" /> {/* Last seen */}
                <Skeleton className="h-3 w-full" /> {/* Joined */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
);
