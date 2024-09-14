"use client"
import { CheckIcon } from "lucide-react"
import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/routing"
import { usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'


export default function LanguajeLink({ locale, lng }: { locale: Locale, lng: string, newLocale: Locale }) {
    const pathName = usePathname()
    const actlocale = useLocale()

    return (
        <Link href={pathName} locale={locale} className="flex gap-3 justify-between">
            <span>{lng}</span>
            {locale === actlocale && <CheckIcon className="h-5 w-5" />}
        </Link>
    )
}
