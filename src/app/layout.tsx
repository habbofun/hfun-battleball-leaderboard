import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter as FontSans } from 'next/font/google';

import { Providers } from '@/components/providers/providers';
import { PageFooter } from '@/components/static/page-footer';
import { PageHeader } from '@/components/static/page-header';
import { cn } from '@/lib/utils';
import { auth } from '@/server/auth';

import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'hfun.info',
  description: 'Habbo Origins: ES | Fansite',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            fontSans.variable,
            'font-sans',
            'flex flex-col min-h-screen overscroll-none',
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
    </SessionProvider>
  );
}
