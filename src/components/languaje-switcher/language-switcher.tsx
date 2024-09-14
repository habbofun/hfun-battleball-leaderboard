import { LanguageClient } from './language-client'
import { useLocale } from 'next-intl'
import LanguajeLink from './languaje-link'
import { useTranslations } from 'next-intl'

export function LanguageToggle() {
  const locale = useLocale()
  const t = useTranslations('languages')
  const otherLocale = locale === 'en' ? 'es' : 'en'

  return (
    <LanguageClient locale={locale}>
      <LanguajeLink locale={"en"} lng={t("en")} newLocale={otherLocale} />
      <LanguajeLink locale={"es"} lng={t("es")} newLocale={otherLocale} />
    </LanguageClient>
  )
}
