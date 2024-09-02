import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { HomePageSkeleton } from "@/components/homepage/homepage-skeleton";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <Suspense fallback={<HomePageSkeleton />}>
                    <Link href="/">
                        <TextEffect
                            per="char"
                            preset="fade"
                            className="text-6xl font-bold"
                        >
                            HFUN.
                        </TextEffect>
                    </Link>
                    <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
                        Browse the page with the menu above
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link href="/catalog" rel="noopener noreferrer">
                            <Button variant="ghost">Catalog</Button>
                        </Link>
                        <Link href="/leaderboard" rel="noopener noreferrer">
                            <Button variant="ghost">Leaderboard</Button>
                        </Link>
                        <Link href="/finder" rel="noopener noreferrer">
                            <Button variant="ghost">Finder</Button>
                        </Link>
                    </div>
                </Suspense>
            </main>
        </div>
    );
}
