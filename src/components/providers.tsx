"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const StarfieldClient = dynamic(() => import("@/components/starfield-client"), {
    ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />
                <StarfieldClient />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
