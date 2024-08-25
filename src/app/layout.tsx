import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Starfield from 'react-starfield';
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "hfun.info",
    description: "Habbo Origins: ES | Battleball Leaderboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(fontSans.variable, "font-sans")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Toaster />
                <Starfield
                    starCount={1000}
                    starColor={[255, 255, 255]}
                    speedFactor={0.05}
                    backgroundColor="black"
                />
            </body>
        </html>
    );
}
