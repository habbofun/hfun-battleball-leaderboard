import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { withRateLimit } from '@/server/middleware/ratelimit-middleware';

async function healthcheckHandler(req: NextRequest) {
  return NextResponse.json(
    { status: 'ok', message: 'https://hfun.info' },
    { status: 200 },
  );
}

export const GET = (req: NextRequest) => withRateLimit(req, healthcheckHandler);
