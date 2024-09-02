import "./globals.css";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers/providers";
import { Inter as FontSans } from "next/font/google";
import { PageHeader } from "@/components/static/page-header";
import { PageFooter } from "@/components/static/page-footer";

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
