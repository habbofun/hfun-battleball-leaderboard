import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { ratelimit } from '@/lib/ratelimiter';

export async function withRateLimit(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
) {
  const ip = req.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Too many requests',
      },
      { status: 429 },
    );
  }

  return handler(req);
}
