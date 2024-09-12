import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { CheckIcon } from "lucide-react"
import type { Locale } from "@/i18n/routing"
import { Link } from "@/i18n/routing"

export default function LanguajeLink({ locale, lng, newLocale }: { locale: Locale, lng: string, newLocale: Locale }) {
    return (
        <Link href={'/'} locale={locale} className="flex gap-3 justify-between">
            <span>{lng}</span>
            {locale !== newLocale && <CheckIcon className="h-5 w-5" />}
        </Link>
    )
}
