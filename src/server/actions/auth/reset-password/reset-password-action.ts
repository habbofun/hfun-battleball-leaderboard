'use server';

import { z } from 'zod';

import { findUser } from '@/data/find-user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { resetPasswordSchema } from '@/lib/zod';

export const resetPasswordAction = async (
  formData: z.infer<typeof resetPasswordSchema>,
) => {
  try {
    const { data, success } = resetPasswordSchema.safeParse(formData);

    if (!success) {
      return { error: 'Invalid data' };
    }

    const user = await findUser(data.email);

    if (!user) {
      return { error: 'User not found' };
    }

    const passwordResetToken = await generatePasswordResetToken(data.email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to process password reset request' };
  }
};
