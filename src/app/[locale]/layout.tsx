import { PageFooter } from '@/components/static/page-footer'
import { PageHeader } from '@/components/static/page-header'

import {
    getMessages,
} from 'next-intl/server'
import type { ReactNode } from 'react'

import { Inter as FontSans } from 'next/font/google'
import { Providers } from '@/components/providers/providers'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

type Props = {
    children: ReactNode
    modal: ReactNode
    params: { locale: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<Props, 'children'>) {
    return {
        title: 'hfun.info',
        description: 'Habbo Origins: ES | Fansite',
    }
}

export default async function LocaleLayout({
    children,
    modal,
    params: { locale }
}: Props) {
    const messages = await getMessages()

    return (
        <html lang={locale}    >
            <body
                className={cn(
                    fontSans.variable,
                    'font-sans',
                    'flex flex-col min-h-screen overscroll-none',
                )}>
                <Providers>
                    <PageHeader />
                    {modal}
                    <main className="flex justify-center flex-grow">{children}</main>
                    <PageFooter />
                </Providers>
            </body>
        </html>
    )
}

