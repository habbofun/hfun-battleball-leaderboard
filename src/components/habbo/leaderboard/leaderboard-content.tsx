'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ErrorDisplay } from '@/components/error/error-display';
import { CountdownTimer } from '@/components/habbo/leaderboard/countdown-timer';
import { columns } from '@/components/habbo/leaderboard/leaderboard-columns';
import { LeaderboardPagination } from '@/components/habbo/leaderboard/leaderboard-pagination';
import { LeaderboardSkeleton } from '@/components/habbo/leaderboard/leaderboard-skeleton';
import { LeaderboardTable } from '@/components/habbo/leaderboard/leaderboard-table';
import { fetchLeaderboardData } from '@/server/actions/catalog/fetch-leaderboard';
import type { LeaderboardEntry } from '@/types/leaderboard';

export default function LeaderboardContent() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10),
  );
  const [perPage, setPerPage] = useState(20);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUpdateIn, setNextUpdateIn] = useState<number | null>(null);
  const [updateInterval, setUpdateInterval] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchLeaderboardData(currentPage, perPage);
        setLeaderboard(data.leaderboard);
        setNextUpdateIn(data.nextUpdateIn);
        setUpdateInterval(data.updateInterval);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Error fetching leaderboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboardData();
  }, [currentPage, perPage]);

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
