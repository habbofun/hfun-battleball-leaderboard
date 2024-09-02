import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { PageHeader } from "@/components/page-header";

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
            <body
                className={cn(fontSans.variable, "font-sans")}
                suppressHydrationWarning
            >
                <Providers>
                    <PageHeader />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
