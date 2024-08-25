"use client";

import { useState, useEffect } from "react";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardSkeleton } from "@/components/leaderboard/leaderboard-skeleton";
import { ErrorDisplay } from "@/components/error-display";
import { CountdownTimer } from "@/components/leaderboard/countdown-timer";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/page-header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import type { LeaderboardEntry, LeaderboardData } from "@/types/leaderboard";

const columns: ColumnDef<LeaderboardEntry>[] = [
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "username",
        header: "Username",
        filterFn: "includesString",
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

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextUpdateIn, setNextUpdateIn] = useState<number | null>(null);
    const [updateInterval, setUpdateInterval] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20); // Default to 20 items per page

    useEffect(() => {
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
                setPerPage(data.metadata.per_page);
                setCurrentPage(data.metadata.page);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Error fetching leaderboard data");
                setIsLoading(false);
                console.error("Error:", err);
            });
    }, [currentPage, perPage]);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <PageHeader />
            <main className="flex-grow flex justify-center p-4">
                <div className="container mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
                    {nextUpdateIn !== null && updateInterval !== null && (
                        <CountdownTimer initialSeconds={nextUpdateIn} totalSeconds={updateInterval} />
                    )}
                    {isLoading ? (
                        <LeaderboardSkeleton />
                    ) : error ? (
                        <ErrorDisplay message={error} />
                    ) : (
                        <>
                            <LeaderboardTable data={leaderboard} columns={columns} />
                            <Pagination className="mt-4">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            href="#" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1) setCurrentPage(prev => prev - 1);
                                            }}
                                            aria-disabled={currentPage === 1}
                                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, index) => (
                                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                        <PaginationItem key={index}>
                                            <PaginationLink 
                                                href="#" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(index + 1);
                                                }}
                                                isActive={currentPage === index + 1}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationEllipsis />
                                    <PaginationItem>
                                        <PaginationNext 
                                            href="#" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
                                            }}
                                            aria-disabled={currentPage === totalPages}
                                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}