import Link from 'next/link';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto text-destructive w-16 h-16 mb-4" />
          <CardTitle className="text-2xl">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            You don&apos;t have permission to access this page. Please sign in
            to continue.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/sign-in" passHref>
            <Button>Sign In</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
