import { cache } from 'react';

import { cookies } from 'next/headers';

import type { Session, User } from 'lucia';
import { decodeHex } from 'oslo/encoding';
import { TOTPController } from 'oslo/otp';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    return result;
  },
);

export const validateTwoFactor = async (sessionId: string, otp: string) => {
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const result = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!result || !result.twoFactorToken) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const totp = new TOTPController().verify(
    otp,
    decodeHex(result.twoFactorToken),
  );

  if (!totp) {
    return {
      success: false,
      error: 'Invalid code',
    };
  }

  return {
    success: true,
  };
};
