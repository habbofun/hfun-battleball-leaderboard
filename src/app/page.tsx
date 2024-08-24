"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ModeToggle } from "@/components/ui/theme-switcher";

interface LeaderboardEntry {
    position: number;
    username: string;
    total_score: number;
    ranked_matches: number;
    non_ranked_matches: number;
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
    {
        accessorKey: "non_ranked_matches",
        header: "Non-Ranked Matches",
    },
];

// Example data for testing
const exampleData: LeaderboardEntry[] = [
    {
        position: 1,
        username: "xez",
        total_score: 86677,
        ranked_matches: 1074,
        non_ranked_matches: 168,
    },
    {
        position: 2,
        username: ".:josefaura:.",
        total_score: 84740,
        ranked_matches: 930,
        non_ranked_matches: 1655,
    },
    // ... Add more entries here ...
    {
        position: 40,
        username: "jakobo-am",
        total_score: 39254,
        ranked_matches: 460,
        non_ranked_matches: 0,
    },
];

// Use an environment variable to determine whether to use example data or fetch from API
const USE_EXAMPLE_DATA = process.env.NEXT_PUBLIC_USE_EXAMPLE_DATA === "true";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (USE_EXAMPLE_DATA) {
            setLeaderboard(exampleData);
            setIsLoading(false);
        } else {
            fetch("http://localhost:2005/leaderboard")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch leaderboard data");
                    }
                    return response.json();
                })
                .then((data) => {
                    setLeaderboard(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError("Error fetching leaderboard data");
                    setIsLoading(false);
                    console.error("Error:", err);
                });
        }
    }, []);

    const table = useReactTable({
        data: leaderboard,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="p-4 flex justify-end">
                <ModeToggle />
            </header>
            <main className="flex-grow flex justify-center items-center p-4">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
                    {USE_EXAMPLE_DATA && (
                        <p className="text-center text-yellow-600 mb-4">
                            Using example data for testing
                        </p>
                    )}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() && "selected"
                                            }
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        </div>
    );
}