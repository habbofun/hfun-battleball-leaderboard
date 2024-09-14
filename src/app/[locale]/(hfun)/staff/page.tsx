import { Suspense } from 'react';

import { StaffList } from '@/components/habbo/staff/staff-list';
import { StaffManagement } from '@/components/habbo/staff/staff-management';
import { validateRequest } from '@/server/validate';

export default async function StaffPage() {
  const { user } = await validateRequest();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow flex justify-center p-4">
        <div className="container mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Habbo Staff</h1>
          <Suspense
            fallback={<div className="text-center">Loading staff data...</div>}
          >
            <StaffList />
          </Suspense>
          {isAdmin && <StaffManagement />}
        </div>
      </main>
    </div>
  );
}
