import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';
import { validateRequest } from '@/server/validate';

export async function logout() {
  'use server';
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const dbSession = await db.session.deleteMany({
    where: {
      userId: session.userId,
    },
  });

  if (!dbSession) {
    return {
      error: 'Failed to logout',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/');
}
