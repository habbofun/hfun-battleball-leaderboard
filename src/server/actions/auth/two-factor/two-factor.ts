'use server';

import { decodeHex, encodeHex } from 'oslo/encoding';
import { TOTPController, createTOTPKeyURI } from 'oslo/otp';
import QRCode from 'qrcode';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

async function validateUser(sessionId: string) {
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  return { success: true, user };
}

async function manageTwoFactor(
  sessionId: string,
  action: 'enable' | 'disable',
) {
  try {
    const { success, user, error } = await validateUser(sessionId);
    if (!success) return { success, error };

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        twoFactorToken: action === 'disable' ? null : undefined,
        twoFactorEnabled: action === 'enable',
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: `Failed to ${action} two factor` };
  }
}

export const enableTwoFactor = async (sessionId: string) => {
  return manageTwoFactor(sessionId, 'enable');
};

export const disableTwoFactor = async (sessionId: string) => {
  return manageTwoFactor(sessionId, 'disable');
};

export async function generateTwoFactor(sessionId: string) {
  try {
    const { success, user, error } = await validateUser(sessionId);
    if (!success) return { success, error };

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const twoFactorToken = crypto.getRandomValues(new Uint8Array(20));
    const uri = createTOTPKeyURI('hfun.info', user.email, twoFactorToken);
    const qrCode = await QRCode.toDataURL(uri);
    const secret = new URL(uri).searchParams.get('secret') || '';

    await db.user.update({
      where: { id: user.id },
      data: {
        twoFactorToken: encodeHex(twoFactorToken),
        twoFactorEnabled: false,
      },
    });

    return { success: true, uri, secret, qrCode };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate two factor secret and URI',
    };
  }
}

export async function validateTwoFactor(sessionId: string, otp: string) {
  try {
    const { success, user, error } = await validateUser(sessionId);
    if (!success) return { success, error };

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { twoFactorToken: true, twoFactorEnabled: true },
    });

    if (!dbUser || !dbUser.twoFactorToken) {
      return { success: false, error: 'Two-factor authentication not set up' };
    }

    const totp = await new TOTPController().verify(
      otp,
      decodeHex(dbUser.twoFactorToken),
    );

    if (!totp) {
      return { success: false, error: 'Invalid code' };
    }

    await db.user.update({
      where: { id: user.id },
      data: { twoFactorEnabled: true },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to validate two factor' };
  }
}
