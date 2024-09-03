import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/prisma';
import { config } from '@/server/auth.config';

export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  ...config,
});
