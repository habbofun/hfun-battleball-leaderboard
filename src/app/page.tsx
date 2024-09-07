import { Suspense } from 'react';

import Link from 'next/link';

import { HomePageSkeleton } from '@/components/homepage/homepage-skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <Suspense fallback={<HomePageSkeleton />}>
          <h1 className="text-6xl font-bold">HFUN.</h1>
          <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
            Browse the page with the menu below
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
          <Separator className="my-8 w-full max-w-sm" />
        </Suspense>
      </main>
    </div>
  );
}
