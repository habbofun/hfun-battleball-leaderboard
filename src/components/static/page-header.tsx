import { Suspense } from 'react';

import Link from 'next/link';

import { Menu } from 'lucide-react';

import UserButton from '@/components/auth/user/user-button';
import { NavigationDrawer } from '@/components/static/navigation-drawer';
import { PageHeaderSkeleton } from '@/components/static/page-header-skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import { TextEffect } from '@/components/ui/text-effect';
import { ModeToggle } from '@/components/ui/theme-switcher';

export function PageHeader() {
  return (
    <Suspense fallback={<PageHeaderSkeleton />}>
      <header className="sticky top-0 z-50 w-full p-4">
        <div className="container mx-auto">
          <div className="bg-background/70 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="px-4 py-3 flex flex-col items-center">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <TextEffect
                      per="char"
                      preset="slide"
                      className="text-2xl font-bold"
                    >
                      HFUN
                    </TextEffect>
                    <Badge variant="default">Beta</Badge>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <UserButton />
                  <ModeToggle />
                  <NavigationDrawer>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                      >
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DrawerTrigger>
                  </NavigationDrawer>
                </div>
              </div>
              <div
                className="w-11/12 mt-3 border-b rounded-full"
                style={{
                  borderColor: 'hsl(var(--border))',
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </Suspense>
  );
}
