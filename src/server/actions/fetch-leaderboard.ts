'use server';

import { apiClient } from '@/lib/api-client';
import type { LeaderboardData } from '@/types/leaderboard';

export async function fetchLeaderboardData(
  currentPage: number,
  perPage: number,
) {
  try {
    const { data } = await apiClient.get<LeaderboardData>('/leaderboard', {
      params: {
        page: currentPage,
        per_page: perPage,
      },
    });

    return {
      leaderboard: data.leaderboard,
      nextUpdateIn: data.next_update_in,
      updateInterval: data.update_interval_seconds,
      totalPages: data.metadata.total_pages,
    };
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Error fetching leaderboard data');
  }
}
