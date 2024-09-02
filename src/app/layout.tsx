import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { Metadata } from "next";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "hfun.info",
    description: "Habbo Origins: ES | Fansite",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    fontSans.variable,
                    "font-sans",
                    "flex flex-col min-h-screen"
                )}
                suppressHydrationWarning
            >
                <Providers>
                    <PageHeader />
                    <main className="flex-grow">{children}</main>
                    <PageFooter />
                </Providers>
            </body>
        </html>
    );
}
