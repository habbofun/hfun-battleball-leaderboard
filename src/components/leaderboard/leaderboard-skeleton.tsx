import { Skeleton } from "@/components/ui/skeleton";

export function LeaderboardSkeleton() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-8">
                <Skeleton className="h-10 w-64 mx-auto" />
            </h1>
            <Skeleton className="h-12 w-full mb-6" /> {/* Table header */}
            {[...Array(5)].map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={i} className="flex items-center space-x-4 py-2 border-b border-gray-200 last:border-b-0">
                    <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                    <Skeleton className="h-6 flex-grow max-w-md" /> {/* Name */}
                    <Skeleton className="h-6 w-20" /> {/* Score */}
                    <Skeleton className="h-6 w-24" /> {/* Rank or other info */}
                </div>
            ))}
        </div>
    );
}