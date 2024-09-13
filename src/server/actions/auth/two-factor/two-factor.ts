'use server';

import { encodeHex } from 'oslo/encoding';
import { createTOTPKeyURI } from 'oslo/otp';
import QRCode from 'qrcode';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

export const generateTwoFactorSecretAndUri = async (sessionId: string) => {
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20));

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      twoFactorToken: encodeHex(twoFactorSecret),
    },
  });

  const uri = createTOTPKeyURI('hfun.info', user.email, twoFactorSecret);
  const qrCode = await QRCode.toDataURL(uri);

  return {
    success: true,
    uri,
    qrCode,
  };
};
