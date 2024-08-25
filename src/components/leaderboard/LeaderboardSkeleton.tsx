import { Skeleton } from "@/components/ui/skeleton";

export function LeaderboardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            {[...Array(5)].map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={i} className="flex space-x-4">
                    <Skeleton className="h-12 w-12" />
                    <Skeleton className="h-12 flex-grow" />
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-24" />
                </div>
            ))}
        </div>
    );
}