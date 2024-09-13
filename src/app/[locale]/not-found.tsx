import { useTranslations } from 'next-intl'
import { NotFound } from '@/components/NotFound'

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
    const t = useTranslations('NotFoundPage')
    return (
        <NotFound title={t('title')}>
            <p className="max-w-[460px]">{t('description')}</p>
        </NotFound>
    )
}
