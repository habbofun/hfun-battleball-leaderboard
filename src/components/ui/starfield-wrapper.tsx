'use client';

import dynamic from 'next/dynamic';

const StarfieldClient = dynamic(
  () => import('@/components/providers/starfield-client'),
  {
    ssr: false,
  },
);

export function StarfieldWrapper() {
  return <StarfieldClient />;
}
