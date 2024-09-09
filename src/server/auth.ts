import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/db';
import { config } from '@/server/auth.config';

export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...config,
});
