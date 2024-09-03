import type { NextAuthConfig } from 'next-auth';
import ResendProvider from 'next-auth/providers/resend';

export const config = {
  providers: [
    ResendProvider({
      from: 'no-reply@kwayservices.top',
      normalizeIdentifier(identifier: string): string {
        let [local, domain] = identifier.toLowerCase().trim().split('@');
        domain = domain?.split(',')[0];
        return `${local}@${domain}`;
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log('Signed in!', { message });
    },
    async signOut(message) {
      console.log('Signed out!', { message });
    },
    async createUser(message) {
      console.log('User created!', { message });
    },
  },
} satisfies NextAuthConfig;
