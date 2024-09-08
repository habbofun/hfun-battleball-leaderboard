'use server';

import HttpStatusCode from '@/enums/http-error-codes';
import { HabboErrorResponse, HabboUserInfo } from '@/types/habbo';

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
    const data: HabboUserInfo | HabboErrorResponse = await response.json();

    if ('error' in data) {
      return { error: 'User not found', status: HttpStatusCode.NOT_FOUND_404 };
    }

    return { data, status: HttpStatusCode.OK_200 };
  } catch (error) {
    return {
      error: 'Failed to fetch user info',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    };
  }
}
