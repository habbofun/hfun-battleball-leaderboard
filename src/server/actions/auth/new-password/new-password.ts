'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { findUser } from '@/data/find-user';
import { getPasswordResetToken } from '@/data/password-reset-token';
import db from '@/lib/db';
import { newPasswordSchema } from '@/lib/zod';

export const newPasswordAction = async (
  data: z.infer<typeof newPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Token is required' };
  }

  const validatedFields = newPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetToken(token);

  if (!existingToken) {
    return { error: 'Invalid token' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token expired' };
  }

  const existingUser = await findUser(existingToken.email);

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true };
};
