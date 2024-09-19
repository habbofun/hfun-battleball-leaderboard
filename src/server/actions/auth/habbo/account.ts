'use server';

import db from '@/lib/db';
import { generateAlphanumericToken } from '@/lib/hash';
import { sleep } from '@/lib/utils';
import { fetchHabboUserInfo } from '@/server/actions/habbo/user/fetch-user-data';

export async function generateHabboVerificationToken(
  userId: string,
  username: string,
) {
  try {
    const dbUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!dbUser) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    await db.habboAccountVerificationToken.deleteMany({
      where: {
        userId,
      },
    });

    const verificationToken = await generateAlphanumericToken(6);

    await db.habboAccountVerificationToken.create({
      data: {
        token: verificationToken,
        userId,
        verifyingUsername: username,
        expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes expiration
      },
    });

    return {
      success: true,
      token: verificationToken,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to verify habbo account',
    };
  }
}

export async function verifyHabboAccount(token: string) {
  try {
    const verificationToken = await db.habboAccountVerificationToken.findUnique(
      {
        where: {
          token,
        },
      },
    );

    if (!verificationToken) {
      return {
        success: false,
        error: 'Verification token not found',
      };
    }

    if (verificationToken.expiresAt < new Date()) {
      return {
        success: false,
        error: 'Verification token expired',
      };
    }

    if (token !== verificationToken.token) {
      return {
        success: false,
        error: 'Invalid verification token',
      };
    }

    await sleep(5000); // Wait for slow af habbo API to populate...

    const habboUser = await fetchHabboUserInfo(
      verificationToken.verifyingUsername,
    );

    if (!habboUser || !habboUser.data) {
      return {
        success: false,
        error: 'Habbo user not found',
      };
    }

    await db.user.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        habboVerifiedUsername: habboUser.data.name,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to verify habbo account',
    };
  }
}

export async function unlinkHabboAccount(userId: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { habboVerifiedUsername: null },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to unlink Habbo account',
    };
  }
}
