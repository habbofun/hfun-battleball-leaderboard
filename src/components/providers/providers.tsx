'use client';

import { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const StarfieldClient = dynamic(() => import('@/components/providers/starfield-client'), {
  ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
        <StarfieldClient />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
