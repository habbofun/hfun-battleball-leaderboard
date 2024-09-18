import Link from 'next/link';

import { ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md">
        <ShieldAlert className="mx-auto text-destructive w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <div className="text-muted-foreground mb-8">
          You do not have the required permissions to view this content.
        </div>
        <Link href="/">
          <Button variant="outline">Go back to the homepage</Button>
        </Link>
      </div>
    </div>
  );
}
