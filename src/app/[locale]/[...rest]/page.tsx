import { notFound } from 'next/navigation';

import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Not found',
  });
}

export default function CatchAllPage() {
  notFound();
}
