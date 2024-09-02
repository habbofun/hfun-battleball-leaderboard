import { Skeleton } from "@/components/ui/skeleton";

export function HomePageSkeleton() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-grow flex flex-col justify-center items-center space-y-4 px-4">
                <Skeleton className="h-16 w-48" /> {/* Title skeleton */}
                <Skeleton className="h-4 w-64" /> {/* Subtitle skeleton */}
                <div className="flex flex-wrap justify-center gap-2">
                    <Skeleton className="h-10 w-24" /> {/* Button skeleton */}
                    <Skeleton className="h-10 w-24" /> {/* Button skeleton */}
                    <Skeleton className="h-10 w-24" /> {/* Button skeleton */}
                </div>
            </main>
        </div>
    );
}
