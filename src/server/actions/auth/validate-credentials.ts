'use server';

import { loginSchema } from '@/lib/zod';

export async function validateCredentials(credentials: any) {
  const { data, success } = loginSchema.safeParse(credentials);
  if (!success) {
    throw new Error('Invalid credentials');
  }
  return data;
}
