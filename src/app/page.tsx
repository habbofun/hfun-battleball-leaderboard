"use client";

import { useState, useEffect } from "react";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { LeaderboardSkeleton } from "@/components/leaderboard/LeaderboardSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ModeToggle } from "@/components/ui/theme-switcher";
import { TextEffect } from "@/components/ui/text-effect";
import { CountdownTimer } from "@/components/leaderboard/CountdownTimer";
import type { ColumnDef } from "@tanstack/react-table";

interface LeaderboardEntry {
    position: number;
    username: string;
    total_score: number;
    ranked_matches: number;
}

interface LeaderboardData {
    leaderboard: LeaderboardEntry[];
    next_update_in: number;
    update_interval_seconds: number;
}

const columns: ColumnDef<LeaderboardEntry>[] = [
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "total_score",
        header: "Total Score",
    },
    {
        accessorKey: "ranked_matches",
        header: "Ranked Matches",
    },
];

// Example data for testing
const exampleData: LeaderboardEntry[] = [
    {
        position: 1,
        username: "xez",
        total_score: 106453,
        ranked_matches: 1283,
    },
    {
        position: 2,
        username: ".:josefaura:.",
        total_score: 104685,
        ranked_matches: 1136,
    },
    {
        position: 3,
        username: "empty",
        total_score: 103776,
        ranked_matches: 1009,
    },
    {
        position: 4,
        username: "cl4s1c0",
        total_score: 103206,
        ranked_matches: 1236,
    },
    {
        position: 5,
        username: "majink",
        total_score: 101090,
        ranked_matches: 1128,
    },
    {
        position: 6,
        username: "parasol",
        total_score: 96260,
        ranked_matches: 1026,
    }
];

// Use an environment variable to determine whether to use example data or fetch from API
const USE_EXAMPLE_DATA = process.env.NEXT_PUBLIC_USE_EXAMPLE_DATA === "true";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextUpdateIn, setNextUpdateIn] = useState<number | null>(null);
    const [updateInterval, setUpdateInterval] = useState<number | null>(null);

    useEffect(() => {
        if (USE_EXAMPLE_DATA) {
            setTimeout(() => {
                setLeaderboard(exampleData);
                setNextUpdateIn(300); // Example: 5 minutes
                setUpdateInterval(3600); // Example: 1 hour
                setIsLoading(false);
            }, 1500); // Simulate loading delay
        } else {
            fetch("https://leaderboard.hfun.info/leaderboard")
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
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError("Error fetching leaderboard data");
                    setIsLoading(false);
                    console.error("Error:", err);
                });
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="p-4 flex justify-between items-center">
                <div className="flex-grow" />
                <TextEffect per='char' preset='blur' className="text-3xl font-bold text-center">
                    Leaderboard
                </TextEffect>
                <div className="flex-grow flex justify-end">
                    <ModeToggle />
                </div>
            </header>
            <main className="flex-grow flex justify-center items-center p-4">
                <div className="container mx-auto max-w-4xl">
                    {USE_EXAMPLE_DATA && (
                        <TextEffect per='char' preset='slide' className="text-center text-yellow-600 mb-4">
                            Using example data for testing
                        </TextEffect>
                    )}
                    {nextUpdateIn !== null && updateInterval !== null && (
                        <CountdownTimer initialSeconds={nextUpdateIn} totalSeconds={updateInterval} />
                    )}
                    {isLoading ? (
                        <LeaderboardSkeleton />
                    ) : error ? (
                        <ErrorDisplay message={error} />
                    ) : (
                        <LeaderboardTable data={leaderboard} columns={columns} />
                    )}
                </div>
            </main>
        </div>
    );
}