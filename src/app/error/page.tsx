'use client';

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

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto text-destructive w-16 h-16 mb-4" />
          <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            We encountered an error while processing your request. Please try
            again or come back later.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Link href="/" passHref>
            <Button variant="outline">Go Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
