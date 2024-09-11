'use server';

import { hash } from '@node-rs/argon2';

import db from '@/lib/db';
import { hashSettings } from '@/lib/hash';
import { generateAndSendPasswordResetEmail } from '@/lib/mail';

export async function sendResetEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(tempPassword, hashSettings);

    return await generateAndSendPasswordResetEmail(
      user.id,
      email,
      hashedPassword,
    );
  } catch (error) {
    return { success: false, error: 'Failed to send reset password email' };
  }
}
