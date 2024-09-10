import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';

import { findUserById } from '@/data/find-user';
import { getTwoFactorConfirmation } from '@/data/two-factor-confirmation';
import prisma from '@/lib/db';
import db from '@/lib/db';
import { config } from '@/server/auth.config';

export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) {
        console.log('no token sub');
        return token;
      }

      const existingUser = await findUserById(token.sub);

      if (!existingUser) {
        console.log('no existing user');
        return token;
      }

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.role = existingUser.role;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      if (!user || !user.id) return false;

      const existingUser = await findUserById(user.id);

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmation(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...config,
});
