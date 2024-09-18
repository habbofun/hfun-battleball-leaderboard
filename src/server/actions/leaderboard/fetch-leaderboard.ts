'use server';

import { leaderboardApiClient } from '@/lib/api';
import type { LeaderboardData } from '@/types/leaderboard';

export async function fetchLeaderboardData(
  currentPage: number,
  perPage: number,
) {
  try {
    const { data } = await leaderboardApiClient.get<LeaderboardData>(
      '/leaderboard',
      {
        params: {
          page: currentPage,
          per_page: perPage,
        },
      },
    );

    return {
      leaderboard: data.leaderboard,
      nextUpdateIn: data.next_update_in,
      updateInterval: data.update_interval_seconds,
      totalPages: data.metadata.total_pages,
    };
  } catch (err) {
    throw new Error('Error fetching leaderboard data');
  }
}
