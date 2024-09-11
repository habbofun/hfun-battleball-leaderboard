import { cookies } from 'next/headers';

import jwt from 'jsonwebtoken';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

export async function verifyPasswordReset(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      code: string;
      email: string;
      userId: string;
      hashedPassword: string;
    };

    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { token: decoded.code, userId: decoded.userId },
    });

    if (!passwordResetToken) {
      return { success: false, message: 'not found -2' };
    }

    await db.user.update({
      where: { id: decoded.userId },
      data: { password: decoded.hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    });

    const session = await lucia.createSession(decoded.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    return { success: false, message: 'expired or invalid' };
  }
}
