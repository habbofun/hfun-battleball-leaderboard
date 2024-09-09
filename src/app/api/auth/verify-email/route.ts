import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import HttpStatusCode from '@/enums/http-error-codes';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return new Response('Token not found', {
      status: HttpStatusCode.BAD_REQUEST_400,
    });
  }

  const verifyToken = await db.verificationToken.findFirst({
    where: {
      token,
    },
  });

  if (!verifyToken) {
    return new Response('Token not found', {
      status: HttpStatusCode.BAD_REQUEST_400,
    });
  }

  if (verifyToken.expires < new Date()) {
    return new Response('Token expired', {
      status: HttpStatusCode.BAD_REQUEST_400,
    });
  }

  const user = await db.user.findUnique({
    where: {
      email: verifyToken.identifier,
    },
  });

  if (user?.emailVerified) {
    return new Response('Email already verified', {
      status: HttpStatusCode.BAD_REQUEST_400,
    });
  }

  await db.user.update({
    where: {
      email: verifyToken.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await db.verificationToken.delete({
    where: {
      identifier: verifyToken.identifier,
    },
  });

  redirect('/login?verified=true');
}
