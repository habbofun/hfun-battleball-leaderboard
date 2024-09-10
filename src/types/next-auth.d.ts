import NextAuth, { User as NextAuthUser } from 'next-auth';

import { Role } from '@prisma/client';

interface User extends NextAuthUser {
  role: UserRole;
  isTwoFactorEnabled: boolean;
}

declare module 'next-auth' {
  interface JWT {
    role: UserRole;
    isTwoFactorEnabled: boolean;
  }

  interface Session {
    user: User & Session['user'];
  }
}
