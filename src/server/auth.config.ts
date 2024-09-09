import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { findUser } from '@/data/find-user';
import { handleEmailVerification } from '@/server/actions/auth/handle-email-verification';
import { validateCredentials } from '@/server/actions/auth/validate-credentials';
import { verifyPassword } from '@/server/actions/auth/verify-password';

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await validateCredentials(credentials);
          const user = await findUser(email);
          if (!user) {
            throw new Error('User not found');
          }
          if (user.password) {
            await verifyPassword(password, user.password);
          } else {
            throw new Error('User password not found');
          }
          await handleEmailVerification(user);
          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('An unexpected error occurred');
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  trustHost: true,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
} satisfies NextAuthConfig;
