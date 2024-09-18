import type { ReactNode } from 'react';

import Link from 'next/link';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
  children?: ReactNode;
  title?: ReactNode;
};

export function NotLoggedIn({ children, title = 'Not Logged In' }: Props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="mx-auto text-destructive w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="text-muted-foreground mb-8">
          {children || 'You need to be logged in to access this page.'}
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href="/sign-in" passHref>
            <Button>Sign In</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
