'use server';

import type { LeaderboardData } from '@/types/leaderboard';

export async function fetchLeaderboardData(
  currentPage: number,
  perPage: number,
) {
  try {
    const response = await fetch(
      `https://leaderboard.hfun.info/leaderboard?page=${currentPage}&per_page=${perPage}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }
    const data: LeaderboardData = await response.json();
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
