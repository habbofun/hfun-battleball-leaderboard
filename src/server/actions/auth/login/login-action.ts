'use server';

import { AuthError } from 'next-auth';

import { z } from 'zod';

import { loginSchema } from '@/lib/zod';
import { signIn } from '@/server/auth';

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: 'Something went wrong - 500' };
  }
};
