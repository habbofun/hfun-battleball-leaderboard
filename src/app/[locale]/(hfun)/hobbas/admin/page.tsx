import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { HobbasAdminPanel } from '@/components/habbo/hobbas/panel';
import { Loader } from '@/components/ui/loader';
import { getCurrentUserRole } from '@/lib/session';

export default async function HobbaAdminPage() {
  const role = await getCurrentUserRole();

  const isAdmin = role === 'admin';
  if (!isAdmin) redirect('/hobbas');

  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<Loader />}>
        <HobbasAdminPanel />
      </Suspense>
    </div>
  );
}
