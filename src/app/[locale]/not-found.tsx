import { useTranslations } from 'next-intl';

import { NotFound } from '@/components/not-found/not-found';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return <NotFound title={t('title')}>{t('message')}</NotFound>;
}
