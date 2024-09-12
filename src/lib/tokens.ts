import jwt from 'jsonwebtoken';

import db from '@/lib/db';
import { TOKEN_TTL, generateNumericToken } from '@/lib/hash';
import { sendEmailVerification, sendPasswordResetEmail } from '@/lib/mail';

export async function generateAndSendVerificationEmail(
  userId: string,
  email: string,
) {
  try {
    const existingCode = await db.emailVerificationToken.findFirst({
      where: {
        userId: userId,
      },
    });

    const hasOneMinutePassed =
      existingCode && existingCode.updatedAt > new Date(Date.now() - 60000);

    if (existingCode && hasOneMinutePassed) {
      return {
        success: false,
        error: `Please wait ${Math.floor((existingCode.updatedAt.getTime() + 60000 - Date.now()) / 1000)} seconds before resending`,
      };
    }

    if (existingCode) {
      await db.emailVerificationToken.delete({
        where: {
          id: existingCode.id,
        },
      });
    }

    const verificationToken = await generateNumericToken(6);

    await db.emailVerificationToken.create({
      data: {
        userId,
        code: verificationToken,
        email,
        expiresAt: new Date(Date.now() + TOKEN_TTL),
      },
    });

    const token = jwt.sign(
      { email, code: verificationToken, userId },
      process.env.JWT_SECRET!,
      {
        expiresIn: '5m',
      },
    );

    return await sendEmailVerification(email, token);
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate and send verification email',
    };
  }
}

export async function generateAndSendPasswordResetEmail(
  userId: string,
  email: string,
  hashedPassword: string,
) {
  try {
    const existingToken = await db.passwordResetToken.findFirst({
      where: {
        userId: userId,
      },
    });

    const hasOneMinutePassed =
      existingToken && existingToken.updatedAt > new Date(Date.now() - 60000);

    if (existingToken && hasOneMinutePassed) {
      return {
        success: false,
        error: `Please wait ${Math.floor((existingToken.updatedAt.getTime() + 60000 - Date.now()) / 1000)} seconds before resending`,
      };
    }

    if (existingToken) {
      await db.passwordResetToken.delete({
        where: {
          userId: userId,
          token: existingToken.token,
        },
      });
    }

    const passwordResetToken = await generateNumericToken(6);

    await db.passwordResetToken.create({
      data: {
        userId,
        token: passwordResetToken,
        expiresAt: new Date(Date.now() + TOKEN_TTL),
      },
    });

    const token = jwt.sign(
      { email, code: passwordResetToken, userId, hashedPassword },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    return await sendPasswordResetEmail(email, token);
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate and send password reset email',
    };
  }
}
