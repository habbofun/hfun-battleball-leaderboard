import type { ReactNode } from 'react';

import { ViewTransitions } from 'next-view-transitions';

import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { StarfieldWrapper } from '@/components/ui/starfield-wrapper';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ViewTransitions>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <StarfieldWrapper />
      </ViewTransitions>
    </QueryProvider>
  );
}
