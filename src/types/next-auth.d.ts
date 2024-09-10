import { DefaultSession, User as DefaultUser } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
      isTwoFactorEnabled?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
    isTwoFactorEnabled?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    isTwoFactorEnabled?: boolean;
  }
}

export type ExtendedUser = User;
