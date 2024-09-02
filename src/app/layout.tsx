import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';
import { Providers } from '@/components/providers';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'hfun.info',
  description: 'Habbo Origins: ES | Battleball Leaderboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, 'font-sans')} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
