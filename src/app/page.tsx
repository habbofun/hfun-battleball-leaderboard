import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { LeaderboardSkeleton } from '@/components/leaderboard/leaderboard-skeleton';
import { PageHeader } from '@/components/page-header';

const LeaderboardContent = dynamic(() => import('@/components/leaderboard/leaderboard-content'), {
  loading: () => <LeaderboardSkeleton />,
});

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PageHeader />
      <main className="flex flex-grow justify-center p-4">
        <div className="container mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LeaderboardSkeleton />}>
            <LeaderboardContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
