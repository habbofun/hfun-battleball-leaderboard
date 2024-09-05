import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function BackToCatalogButton() {
  return (
    <Link href="/catalog" passHref>
      <Button variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Catalog
      </Button>
    </Link>
  );
}
