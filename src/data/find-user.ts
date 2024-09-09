'use server';

import db from '@/lib/db';

export async function findUser(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return null; // Return null instead of throwing an error
  }
  return user;
}
