'use server';

import HttpStatusCode from '@/enums/http-error-codes';
import db from '@/lib/db';
import { HabboErrorResponse, HabboUserInfo } from '@/types/habbo';

export async function verifyHabboOwnership(
  username: string,
  email: string,
  expectedMotto: string,
): Promise<{ verified: boolean; error?: string; status: number }> {
  if (!username || !expectedMotto) {
    return {
      verified: false,
      error: 'Username and expected motto are required',
      status: HttpStatusCode.BAD_REQUEST_400,
    };
  }

  try {
    // Wait for 5 seconds to allow the API to update
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch(
      `https://origins.habbo.es/api/public/users?name=${username}`,
    );
    const rawData: unknown = await response.json();

    const isHabboUserInfo = (data: unknown): data is HabboUserInfo => {
      return (data as HabboUserInfo).uniqueId !== undefined;
    };

    const isHabboErrorResponse = (
      data: unknown,
    ): data is HabboErrorResponse => {
      return (data as HabboErrorResponse).error !== undefined;
    };

    if (isHabboErrorResponse(rawData)) {
      return {
        verified: false,
        error: 'User not found',
        status: HttpStatusCode.NOT_FOUND_404,
      };
    }

    if (isHabboUserInfo(rawData)) {
      const userInfo: HabboUserInfo = rawData;
      if (userInfo.motto !== expectedMotto) {
        return {
          verified: false,
          error: 'Motto does not match',
          status: HttpStatusCode.UNAUTHORIZED_401,
        };
      }

      const userToVerify = await db.user.findUnique({
        where: { email: email },
      });

      if (!userToVerify) {
        return {
          verified: false,
          error: 'User not found',
          status: HttpStatusCode.NOT_FOUND_404,
        };
      }

      await db.habboUserVerification.upsert({
        where: { userId: userToVerify.id },
        update: {
          isVerified: true,
          verifiedName: username,
          verificationDate: new Date(),
        },
        create: {
          userId: userToVerify.id,
          isVerified: true,
          verifiedName: username,
          verificationDate: new Date(),
        },
      });

      return { verified: true, status: HttpStatusCode.OK_200 };
    }

    return {
      verified: false,
      error: 'Invalid response format',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    };
  } catch (error) {
    return {
      verified: false,
      error: 'Failed to verify Habbo ownership',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    };
  }
}
