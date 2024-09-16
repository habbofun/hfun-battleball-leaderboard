'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import db from '@/lib/db';
import { getCurrentSession } from '@/lib/session';
import { lucia } from '@/server/lucia';

export async function logout() {
  try {
    const session = await getCurrentSession();

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
  } catch (error) {
    return {
      success: false,
      error: 'Failed to logout',
    };
  } finally {
    return redirect('/');
  }
}
