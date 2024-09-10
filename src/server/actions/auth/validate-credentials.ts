'use server';

import { loginSchema } from '@/schemas';

export async function validateCredentials(credentials: any) {
  const { data, success } = loginSchema.safeParse(credentials);
  if (!success) {
    throw new Error('Invalid credentials');
  }
  return data;
}
