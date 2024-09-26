import { Suspense } from 'react';

import { TeamAdminPanel } from '@/components/habbo/team/panel';
import { Loader } from '@/components/ui/loader';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Team admin',
  });
}

export default async function TeamAdminPage() {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<Loader />}>
        <TeamAdminPanel />
      </Suspense>
    </div>
  );
}
