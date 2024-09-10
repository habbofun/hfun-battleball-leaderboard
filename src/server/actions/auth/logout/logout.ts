'use server';

import { signOut } from '@/server/auth';

export const logoutAction = async () => {
  await signOut({
    redirectTo: '/',
  });
};
