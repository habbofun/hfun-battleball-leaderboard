import { Menu } from 'lucide-react';
import { Github } from 'lucide-react'; // Import GitHub icon
import Link from 'next/link';

import { NavigationDrawer } from '@/components/navigation-drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import { TextEffect } from '@/components/ui/text-effect';
import { ModeToggle } from '@/components/ui/theme-switcher';

export function PageHeader() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link href="https://hfun.info" target="_blank" rel="noopener noreferrer">
            <TextEffect per="char" preset="blur" className="cursor-pointer text-3xl font-bold">
              HFUN Leaderboard
            </TextEffect>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="mr-2">
            Beta
          </Badge>
          <Link
            href="https://github.com/habbofun/hfun-battleball-leaderboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
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
  );
}
