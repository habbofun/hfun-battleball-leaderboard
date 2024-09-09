import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import { config as authConfig } from '@/server/auth.config';

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = [
  '/',
  '/catalog',
  '/catalog/*',
  '/leaderboard',
  '/leaderboard/*',
  '/finder',
  '/finder/*',
];
const authRoutes = ['/login', '/register'];
const apiAuthPrefix = '/api/auth';

function matchWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith('/*')) {
    const basePattern = pattern.slice(0, -2);
    return path === basePattern || path.startsWith(basePattern + '/');
  }
  return path === pattern;
}

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  if (publicRoutes.some((route) => matchWildcard(nextUrl.pathname, route))) {
    return NextResponse.next();
  }

  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.some((route) => matchWildcard(nextUrl.pathname, route))
  ) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

// Config remains unchanged
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
