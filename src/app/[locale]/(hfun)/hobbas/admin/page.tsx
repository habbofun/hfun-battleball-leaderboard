import { Suspense } from 'react';

import { HobbasAdminPanel } from '@/components/habbo/hobbas/panel';
import { Loader } from '@/components/ui/loader';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Hobbas admin',
  });
}

export default async function HobbaAdminPage() {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<Loader />}>
        <HobbasAdminPanel />
      </Suspense>
    </div>
  );
}
