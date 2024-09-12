'use server';

import { hash } from '@node-rs/argon2';

import db from '@/lib/db';
import { hashSettings } from '@/lib/hash';
import { generateAndSendVerificationEmail } from '@/lib/tokens';
import { type RegisterSchema, registerSchema } from '@/schemas/auth';

export async function createAccount(values: RegisterSchema) {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        success: false,
        error: 'Failed to create account (-1)',
      };
    }

    const emailExists = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const usernameExists = await db.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (emailExists || usernameExists) {
      return {
        success: false,
        error: 'Failed to create account (-2)',
      };
    }

    const hashedPassword = await hash(data.password, hashSettings);

    const user = await db.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
      },
    });

    await generateAndSendVerificationEmail(user.id, data.email);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create account (-3)',
    };
  }
}
