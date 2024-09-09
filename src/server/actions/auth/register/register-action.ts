'use server';

import { AuthError } from 'next-auth';

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import db from '@/lib/db';
import { registerSchema } from '@/lib/zod';
import { signIn } from '@/server/auth';

export const registerAction = async (
  formData: z.infer<typeof registerSchema>,
) => {
  try {
    const { data, success } = registerSchema.safeParse(formData);

    if (!success) {
      return { error: 'Invalid data' };
    }

    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return { error: 'User already exists' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        name: data.name,
      },
    });

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
