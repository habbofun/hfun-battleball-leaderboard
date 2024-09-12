import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Role } from '@prisma/client';
import { Lucia } from 'lucia';

import db from '@/lib/db';

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'hfun-battleball-leaderboard-session',
    expires: true,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      role: attributes.role,
      emailVerified: attributes.emailVerified,
      twoFactorSecret: attributes.twoFactorSecret !== null,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  twoFactorSecret: string | null;
}
