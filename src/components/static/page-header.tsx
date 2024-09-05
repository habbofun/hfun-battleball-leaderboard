import { Suspense } from 'react';

import Link from 'next/link';

import { Menu } from 'lucide-react';

import { AuthStatusWrapper } from '@/components/static/auth-status-wrapper';
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
      <header className="w-full bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" rel="noopener noreferrer">
              <TextEffect
                per="char"
                preset="slide"
                className="text-3xl font-bold cursor-pointer"
              >
                HFUN
              </TextEffect>
            </Link>
            <Badge variant="default" className="mr-2">
              Beta
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <AuthStatusWrapper />
            <ModeToggle />
            <NavigationDrawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DrawerTrigger>
            </NavigationDrawer>
          </div>
        </div>
      </header>
    </Suspense>
  );
}
