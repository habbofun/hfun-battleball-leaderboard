import { NextRequest, NextResponse } from 'next/server';

import HttpStatusCode from '@/enums/http-error-codes';
import { HabboErrorResponse, HabboUserInfo } from '@/types/habbo';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: HttpStatusCode.BAD_REQUEST_400 },
    );
  }

  try {
    const response = await fetch(
      `https://origins.habbo.es/api/public/users?name=${username}`,
    );
    const data: HabboUserInfo | HabboErrorResponse = await response.json();

    if ('error' in data) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: HttpStatusCode.NOT_FOUND_404 },
      );
    }

    return NextResponse.json(data, { status: HttpStatusCode.OK_200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user info' },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 },
    );
  }
}
