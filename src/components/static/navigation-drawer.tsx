import Link from 'next/link';

import { ArrowRight, Github, Globe, Home, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

export function NavigationDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      {children}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            Access different sections of the site
          </DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col items-stretch p-4 space-y-4">
            <NavigationLink
              href="/"
              icon={<Home className="mr-2 h-4 w-4" />}
              text="Home"
            />
            <NavigationLink
              href="/catalog"
              icon={<Globe className="mr-2 h-4 w-4" />}
              text="Catalog"
            />
            <NavigationLink
              href="/leaderboard"
              icon={<MessageCircle className="mr-2 h-4 w-4" />}
              text="Leaderboard"
            />
            <NavigationLink
              href="/finder"
              icon={<Github className="mr-2 h-4 w-4" />}
              text="Finder"
            />
            <DrawerClose asChild>
              <Button variant="default" className="w-full mt-4">
                Close
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function NavigationLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link href={href} className="w-full">
      <Button variant="ghost" className="w-full justify-between">
        <span className="flex items-center">
          {icon}
          {text}
        </span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Link>
  );
}
