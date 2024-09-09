'use server';

import bcrypt from 'bcryptjs';

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
}
