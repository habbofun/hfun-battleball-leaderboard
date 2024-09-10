'use server';

import { AuthError } from 'next-auth';

import { z } from 'zod';

import { findUser } from '@/data/find-user';
import { getTwoFactorConfirmation } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import db from '@/lib/db';
import { sendTwoFactorEmail } from '@/lib/mail';
import { generateTwoFactorTokenByEmail } from '@/lib/tokens';
import { loginSchema } from '@/schemas';
import { signIn } from '@/server/auth';

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await findUser(email);

    if (!existingUser) {
      return { error: 'User not found' };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email,
        );

        if (!twoFactorToken || twoFactorToken.token !== code) {
          return { error: 'Invalid code' };
        }

        if (twoFactorToken.expires < new Date()) {
          return { error: 'Code has expired' };
        }

        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const twoFactorConfirmation = await db.twoFactorConfirmation.upsert({
          where: { userId: existingUser.id },
          update: {}, // No need to update anything, just ensure it exists
          create: {
            userId: existingUser.id,
          },
        });

        if (!twoFactorConfirmation) {
          return { error: 'Error during two-factor authentication' };
        }
      } else {
        const twoFactorToken = await generateTwoFactorTokenByEmail(
          existingUser.email,
        );
        await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

        return { twoFactor: true };
      }
    }

    try {
      const signInResult = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInResult?.error) {
        return { error: signInResult.error };
      }

      return { success: true };
    } catch (signInError) {
      return { error: 'Failed to sign in' };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || 'Authentication error' };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Something went wrong - 500' };
  }
};
