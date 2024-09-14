import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { LanguageClient } from './language-client';
import LanguajeLink from './languaje-link';

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations('languages');
  const otherLocale = locale === 'en' ? 'es' : 'en';

  return (
    <LanguageClient locale={locale}>
      <LanguajeLink locale={'en'} lng={t('en')} newLocale={otherLocale} />
      <LanguajeLink locale={'es'} lng={t('es')} newLocale={otherLocale} />
    </LanguageClient>
  );
}
