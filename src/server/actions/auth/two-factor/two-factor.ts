'use server';

import { encodeHex } from 'oslo/encoding';
import { createTOTPKeyURI } from 'oslo/otp';
import QRCode from 'qrcode';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

export const generatetwoFactorTokenAndUri = async (sessionId: string) => {
  try {
    const { user } = await lucia.validateSession(sessionId);

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const twoFactorToken = crypto.getRandomValues(new Uint8Array(20));

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        twoFactorToken: encodeHex(twoFactorToken),
      },
    });

    const uri = createTOTPKeyURI('hfun.info', user.email, twoFactorToken);
    const qrCode = await QRCode.toDataURL(uri);

    // Extract the secret from the URI
    const secret = new URL(uri).searchParams.get('secret') || '';

    return {
      success: true,
      uri: uri,
      secret: secret,
      qrCode: qrCode,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate two factor secret and URI',
    };
  }
};

export const disableTwoFactor = async (sessionId: string) => {
  try {
    const { user } = await lucia.validateSession(sessionId);

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        twoFactorToken: null,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to disable two factor',
    };
  }
};
