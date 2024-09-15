import type { ReactNode } from 'react';

import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter as FontSans } from 'next/font/google';

import { Providers } from '@/components/providers/providers';
import { PageFooter } from '@/components/static/page-footer';
import { PageHeader } from '@/components/static/page-header';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

type Props = {
  children: ReactNode;
  modal: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  return {
    title: 'hfun.info',
    description: 'Habbo Origins: ES | Fansite',
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  modal,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn(
          fontSans.variable,
          'font-sans',
          'flex flex-col min-h-screen overscroll-none',
        )}
      >
        <Providers>
          <PageHeader />
          {modal}
          <main className="flex justify-center flex-grow">{children}</main>
          <PageFooter />
        </Providers>
      </body>
    </html>
  );
}
