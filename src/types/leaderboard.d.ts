interface LeaderboardEntry {
    position: number;
    username: string;
    total_score: number;
    ranked_matches: number;
}

interface LeaderboardData {
    leaderboard: LeaderboardEntry[];
    metadata: {
        total_users: number;
        page: number;
        per_page: number;
        total_pages: number;
    };
    next_update_in: number;
    update_interval_minutes: number;
    update_interval_seconds: number;
}

export type { LeaderboardEntry, LeaderboardData };