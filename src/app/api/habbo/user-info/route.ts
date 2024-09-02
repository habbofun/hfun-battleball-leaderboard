import { NextRequest, NextResponse } from 'next/server';

import { HabboErrorResponse, HabboUserInfo } from '@/types/habbo';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://origins.habbo.es/api/public/users?name=${username}`);
    const data: HabboUserInfo | HabboErrorResponse = await response.json();

    if ('error' in data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
  }
}
