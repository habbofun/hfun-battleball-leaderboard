import { cache } from 'react';

import 'server-only';

import { validateRequest } from '@/server/validate';

export const getUserAndSession = cache(async () => {
  const session = await validateRequest();

  if (!session.user) {
    return { user: null, session: null };
  }

  return { user: session.user, session: session.session };
});

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();

  if (!session.user) {
    return null;
  }

  return session.user;
});

export const getCurrentSession = cache(async () => {
  const session = await validateRequest();

  if (!session.session) {
    return null;
  }

  return session.session;
});

export const getCurrentUserRole = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user.role;
});
