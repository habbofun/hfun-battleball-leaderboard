'use server';

import HttpStatusCode from '@/enums/http-error-codes';
import type { HabboErrorResponse, HabboUserInfo } from '@/types/habbo';

export async function fetchHabboUserInfo(
  username: string,
): Promise<{ data?: HabboUserInfo; error?: string; status: number }> {
  if (!username) {
    return {
      error: 'Username is required',
      status: HttpStatusCode.BAD_REQUEST_400,
    };
  }

  try {
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
      return { error: 'User not found', status: HttpStatusCode.NOT_FOUND_404 };
    }

    if (isHabboUserInfo(rawData)) {
      return { data: rawData, status: HttpStatusCode.OK_200 };
    }

    return {
      error: 'Invalid response format',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    };
  } catch (error) {
    return {
      error: 'Failed to fetch user info',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    };
  }
}
