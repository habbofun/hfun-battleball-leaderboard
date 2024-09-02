import type { ColumnDef } from "@tanstack/react-table";
import type { LeaderboardEntry } from "@/types/leaderboard";

export const columns: ColumnDef<LeaderboardEntry>[] = [
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
