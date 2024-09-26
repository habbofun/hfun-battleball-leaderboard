import type { ReactNode } from 'react';

import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter as FontSans } from 'next/font/google';

import { DynamicBreadcrumb } from '@/components/navigation/dynamic-breadcrumb';
import { Providers } from '@/components/providers/providers';
import { PageFooter } from '@/components/static/page-footer';
import { PageHeader } from '@/components/static/page-header';
import { routing } from '@/i18n/routing';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
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
  return generatePageMetadata({
    title: 'hfun.info',
  });
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
          <DynamicBreadcrumb />
          <div className="flex-grow flex flex-col">
            {modal}
            <main className="w-full max-w-7xl px-4 py-4 mx-auto flex-grow flex flex-col">
              {children}
            </main>
          </div>
          <PageFooter />
        </Providers>
      </body>
    </html>
  );
}
