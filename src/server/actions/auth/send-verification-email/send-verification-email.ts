'use server';

import db from '@/lib/db';
import { generateAndSendVerificationEmail } from '@/lib/tokens';

export async function sendVerificationEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.emailVerified) {
      return { success: false, error: 'Email already verified' };
    }

    return await generateAndSendVerificationEmail(user.id, email);
  } catch (error) {
    return { success: false, error: 'Failed to send verification email' };
  }
}
