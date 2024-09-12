'use server';

import { hash } from '@node-rs/argon2';

import db from '@/lib/db';
import { hashSettings } from '@/lib/hash';
import { generateAndSendPasswordResetEmail } from '@/lib/tokens';

export async function sendResetEmail(email: string, newPassword: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const hashedPassword = await hash(newPassword, hashSettings);

    return await generateAndSendPasswordResetEmail(
      user.id,
      email,
      hashedPassword,
    );
  } catch (error) {
    return { success: false, error: 'Failed to send reset password email' };
  }
}
