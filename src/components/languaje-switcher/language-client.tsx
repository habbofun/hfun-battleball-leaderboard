'use client';

import type { ReactElement } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageClient({
  children,
  locale,
}: {
  children: Iterable<ReactElement>;
  locale: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="uppercase">{locale}</div>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
          <span className="sr-only"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2 p-2">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
