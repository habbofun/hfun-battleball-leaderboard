import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const HobbaListSkeleton = () => (
  <div className="space-y-8">
    {[...Array(2)].map((_, groupIndex) => (
      <div key={groupIndex}>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, cardIndex) => (
            <Card key={cardIndex}>
              <CardContent className="flex flex-col items-center p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <div className="w-full space-y-1 mt-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
);
