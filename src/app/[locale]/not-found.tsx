import { useTranslations } from 'next-intl';

import { NotFound } from '@/components/not-found';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <NotFound title={t('title')}>
      <p className="max-w-[460px]">{t('description')}</p>
    </NotFound>
  );
}
