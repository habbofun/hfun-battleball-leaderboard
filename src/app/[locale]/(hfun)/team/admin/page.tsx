import { Suspense } from 'react';

import { TeamAdminPanel } from '@/components/habbo/team/panel';
import { Loader } from '@/components/ui/loader';

export default async function TeamAdminPage() {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<Loader />}>
        <TeamAdminPanel />
      </Suspense>
    </div>
  );
}
