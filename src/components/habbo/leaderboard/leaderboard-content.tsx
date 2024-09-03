'use client';

import { useState } from 'react';

import { CountdownTimer } from '@/components/habbo/leaderboard/countdown-timer';
import { columns } from '@/components/habbo/leaderboard/leaderboard-columns';
import { LeaderboardPagination } from '@/components/habbo/leaderboard/leaderboard-pagination';
import { LeaderboardSkeleton } from '@/components/habbo/leaderboard/leaderboard-skeleton';
import { LeaderboardTable } from '@/components/habbo/leaderboard/leaderboard-table';
import { ErrorDisplay } from '@/components/static/error-display';
import { useLeaderboardData } from '@/hooks/use-leaderboard-data';

export default function LeaderboardContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const {
    leaderboard,
    isLoading,
    error,
    nextUpdateIn,
    updateInterval,
    totalPages,
  } = useLeaderboardData(currentPage, perPage);

  if (isLoading) return <LeaderboardSkeleton />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <>
      {nextUpdateIn !== null && updateInterval !== null && (
        <CountdownTimer
          initialSeconds={nextUpdateIn}
          totalSeconds={updateInterval}
        />
      )}
      <LeaderboardTable data={leaderboard} columns={columns} />
      <LeaderboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
