'use server';

import { cookies } from 'next/headers';

import { verify } from '@node-rs/argon2';

import db from '@/lib/db';
import { hashSettings } from '@/lib/hash';
import { type LoginSchema, loginSchema } from '@/schemas/auth';
import { validateTwoFactor } from '@/server/actions/auth/two-factor/two-factor';
import { lucia } from '@/server/lucia';

export async function signIn(values: LoginSchema) {
  try {
    const { data, success } = loginSchema.safeParse(values);

    if (!success) {
      return {
        success: false,
        error: 'Failed to sign in (-1)',
      };
    }

    const user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'Failed to sign in (-2)',
      };
    }

    const passwordMatch = await verify(
      user.password,
      data.password,
      hashSettings,
    );

    if (!passwordMatch) {
      return {
        success: false,
        error: 'Failed to sign in (-4)',
      };
    }

    if (!user.emailVerified) {
      return {
        success: false,
        error: 'Email not verified',
      };
    }

    if (user.twoFactorEnabled) {
      if (!data.twoFactorCode) {
        return {
          success: false,
          requiresTwoFactor: true,
          userId: user.id,
        };
      }

      const twoFactorResult = await validateTwoFactor(
        user.id,
        data.twoFactorCode,
      );

      if (!twoFactorResult.success) {
        return {
          success: false,
          error: 'Invalid two-factor code',
        };
      }
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to sign in',
    };
  }
}
