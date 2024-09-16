import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { LeaderboardSkeleton } from '@/components/habbo/leaderboard/leaderboard-skeleton';

const LeaderboardContent = dynamic(
  () => import('@/components/habbo/leaderboard/leaderboard-content'),
  {
    loading: () => <LeaderboardSkeleton />,
  },
);

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <main className="flex-grow flex justify-center p-4">
        <div className="container mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LeaderboardSkeleton />}>
            <LeaderboardContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
