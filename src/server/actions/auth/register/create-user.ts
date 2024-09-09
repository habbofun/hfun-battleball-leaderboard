'use server';

import bcrypt from 'bcryptjs';

import db from '@/lib/db';

export async function createUser(
  email: string,
  password: string,
  name: string,
) {
  const passwordHash = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { email, password: passwordHash, name },
  });
}
