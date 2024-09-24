import { Link } from 'next-view-transitions';

import { Menu } from 'lucide-react';

import UserButton from '@/components/auth/user/user-button';
import { NavigationDrawer } from '@/components/static/navigation-drawer';
import { ModeToggle } from '@/components/theme-switcher/theme-switcher';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import { TextEffect } from '@/components/ui/text-effect';

import { LanguageToggle } from '../languaje-switcher/language-switcher';

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full p-2 sm:p-4">
      <div className="container mx-auto">
        <div className="bg-background/70 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="px-2 sm:px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <Link
                href="/"
                className="flex items-center space-x-2 mb-2 sm:mb-0"
              >
                <TextEffect
                  per="char"
                  preset="slide"
                  className="text-xl sm:text-2xl font-bold"
                >
                  HFUN
                </TextEffect>
                <Badge variant="default">Beta</Badge>
              </Link>
              <div className="flex items-center space-x-2">
                <UserButton />
                <LanguageToggle />
                <ModeToggle />
                <NavigationDrawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="sm:hidden"
                      aria-label="Open navigation menu"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DrawerTrigger>
                </NavigationDrawer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
