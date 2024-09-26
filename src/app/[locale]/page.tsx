import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { navigationLinks } from '@/config/navigation';
import { Link } from '@/i18n/routing';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Home',
  });
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('navigation');

  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <h1 className="text-6xl font-bold">HFUN.</h1>
        <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
          {t('message')}
        </p>
        <div className="flex flex-wrap justify-center">
          {navigationLinks.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} rel="noopener noreferrer">
              <Button variant="ghost" className="gap-1">
                <Icon className="w-4 h-4" />
                {t(label)}
              </Button>
            </Link>
          ))}
        </div>
        <Separator className="my-4 w-full max-w-sm" />
      </div>
    </div>
  );
}
