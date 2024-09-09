'use server';

import db from '@/lib/db';

export async function checkExistingUser(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user ? { error: 'User already exists' } : { success: true };
}
