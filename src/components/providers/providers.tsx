import { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { StarfieldWrapper } from '@/components/ui/starfield-wrapper';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SessionProvider>
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
      </SessionProvider>
    </QueryProvider>
  );
}
