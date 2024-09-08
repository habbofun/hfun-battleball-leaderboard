import { NextResponse } from 'next/server';

import HttpStatusCode from '@/enums/http-error-codes';
import { auth } from '@/server/auth';

export const GET = auth(function GET(req) {
  if (req.auth) {
    return NextResponse.json({
      status: 'success',
      message: 'Access granted to protected data',
      data: 'Protected data',
    });
  }

  return NextResponse.json(
    {
      status: 'error',
      message: 'Authentication required to access protected data',
    },
    { status: HttpStatusCode.UNAUTHORIZED_401 },
  );
});
