import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getAllHobbas, getHobba } from '@/data/hobbas';
import { getCurrentSession } from '@/lib/session';
import { withRateLimit } from '@/server/middleware/ratelimit-middleware';

async function getHobbasHandler(req: NextRequest) {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized', unauthorized: true },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    const result = username ? await getHobba(username) : await getAllHobbas();

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export const GET = (req: NextRequest) => withRateLimit(req, getHobbasHandler);
