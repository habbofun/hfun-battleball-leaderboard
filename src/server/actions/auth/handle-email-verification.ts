'use server';

import { nanoid } from 'nanoid';

import db from '@/lib/db';
import { sendEmailVerification } from '@/lib/mail';

export async function handleEmailVerification(user: any) {
  if (!user.emailVerified) {
    if (!user.email) {
      throw new Error('User email not found');
    }

    await db.verificationToken.deleteMany({
      where: { identifier: user.email },
    });

    const token = nanoid();

    await db.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    await sendEmailVerification(user.email, token);

    throw new Error('Please check your email for verification');
  }
}
