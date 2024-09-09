'use server';

import db from '@/lib/db';

export async function findUser(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return null;
  }
  return user;
}

export async function findUserById(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    return null;
  }
  return user;
}
