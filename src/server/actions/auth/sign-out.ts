'use server';

import { signOut } from '@/server/auth';

export const signOutAction = async () => {
  await signOut({ redirect: false });
};
