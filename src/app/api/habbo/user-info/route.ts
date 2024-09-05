import { NextRequest, NextResponse } from 'next/server';

import { HabboErrorResponse, HabboUserInfo } from '@/types/habbo';

enum HttpStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: HttpStatus.BAD_REQUEST },
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
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user info' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}
