import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getLocale, getTranslations } from 'next-intl/server';

import { NotFound } from '@/components/not-found';

export default async function NotFoundPage() {
  const locale = await getLocale();
  unstable_setRequestLocale(locale);
  const t = await getTranslations('NotFoundPage');

  return (
    <NotFound title={t('title')}>
      <p className="max-w-[460px]">{t('description')}</p>
    </NotFound>
  );
}
