import { Suspense } from 'react';

import Link from 'next/link';

import { HomePageSkeleton } from '@/components/homepage/homepage-skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/server/auth';

export default async function HomePage() {
  const session = await auth();

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
          {session ? (
            <p>Signed in as: {session?.user?.email}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/auth/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}
