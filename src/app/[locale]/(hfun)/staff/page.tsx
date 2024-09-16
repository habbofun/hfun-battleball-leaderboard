import { Suspense } from 'react';

import { StaffList } from '@/components/habbo/staff/staff-list';
import { StaffManagement } from '@/components/habbo/staff/staff-management';
import { getCurrentUser } from '@/lib/session';

export default async function StaffPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Habbo Staff</h1>
        <Suspense
          fallback={<div className="text-center">Loading staff data...</div>}
        >
          <StaffList />
        </Suspense>
        {isAdmin && (
          <div className="mt-12">
            <StaffManagement />
          </div>
        )}
      </main>
    </div>
  );
}
