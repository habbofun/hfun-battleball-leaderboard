import { Suspense } from 'react';

import { AdminToolbar } from '@/components/auth/hobbas/admin-toolbar';
import { HobbasList } from '@/components/auth/hobbas/hobbas-list';
import { getCurrentUser } from '@/lib/session';

export default async function HobbaPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Hobbas</h1>
        <Suspense fallback={<div>Loading hobbas data...</div>}>
          <HobbasList />
        </Suspense>
        {isAdmin && <AdminToolbar />}
      </main>
    </div>
  );
}
