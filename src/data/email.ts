import { cookies } from 'next/headers';

import jwt from 'jsonwebtoken';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

export async function verifyEmail(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      code: string;
      email: string;
      userId: string;
    };

    console.log('Decoded token:', decoded);

    const emailVerificationToken = await db.emailVerificationToken.findFirst({
      where: {
        code: decoded.code,
        userId: decoded.userId,
      },
    });

    if (!emailVerificationToken) {
      return { success: false, message: 'not found -2' };
    }

    await db.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        emailVerified: true,
      },
    });

    await db.emailVerificationToken.delete({
      where: {
        id: emailVerificationToken.id,
      },
    });

    const session = await lucia.createSession(decoded.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true, message: 'Email verified successfully' };
  } catch (error) {
    console.log('Error verifying email:', error);
    return { success: false, message: 'expired or invalid' };
  }
}
