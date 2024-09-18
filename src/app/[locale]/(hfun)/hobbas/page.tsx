import { Suspense } from 'react';

import Link from 'next/link';

import { NotLoggedIn } from '@/components/auth/not-logged-in';
import { HobbasList } from '@/components/habbo/hobbas/hobbas';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { getUserAndSession } from '@/lib/session';

export default async function HobbaPage() {
  const { user, session } = await getUserAndSession();

  const isAdmin = user?.role === 'admin';

  if (!session) {
    return <NotLoggedIn />;
  }

  return (
    <div className="flex flex-col flex-1">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hobbas</h1>
          {isAdmin && (
            <Link href="/hobbas/admin">
              <Button>Admin</Button>
            </Link>
          )}
        </div>
        <Suspense fallback={<Loader />}>
          <HobbasList />
        </Suspense>
      </main>
    </div>
  );
}
