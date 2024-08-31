import { useState, useEffect } from "react";
import type { LeaderboardEntry, LeaderboardData } from "@/types/leaderboard";

export function useLeaderboardData(currentPage: number, perPage: number) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextUpdateIn, setNextUpdateIn] = useState<number | null>(null);
    const [updateInterval, setUpdateInterval] = useState<number | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://leaderboard.hfun.info/leaderboard?page=${currentPage}&per_page=${perPage}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch leaderboard data");
                }
                return response.json();
            })
            .then((data: LeaderboardData) => {
                setLeaderboard(data.leaderboard);
                setNextUpdateIn(data.next_update_in);
                setUpdateInterval(data.update_interval_seconds);
                setTotalPages(data.metadata.total_pages);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Error fetching leaderboard data");
                setIsLoading(false);
                console.error("Error:", err);
            });
    }, [currentPage, perPage]);

    return { leaderboard, isLoading, error, nextUpdateIn, updateInterval, totalPages };
}