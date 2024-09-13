import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { PageFooter } from '@/components/static/page-footer'
import { PageHeader } from '@/components/static/page-header'

import {
    getMessages,
    getTranslations,
    unstable_setRequestLocale
} from 'next-intl/server'
import type { ReactNode } from 'react'

import { routing } from '@/i18n/routing'
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
    //const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

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
    // Enable static rendering

    // Providing all messages to the client
    // side is the easiest way to get started
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

