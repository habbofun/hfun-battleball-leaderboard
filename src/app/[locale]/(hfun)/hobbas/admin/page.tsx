import { Suspense } from 'react';

import { HobbasAdminPanel } from '@/components/habbo/hobbas/panel';
import { Loader } from '@/components/ui/loader';

export default async function HobbaAdminPage() {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<Loader />}>
        <HobbasAdminPanel />
      </Suspense>
    </div>
  );
}
