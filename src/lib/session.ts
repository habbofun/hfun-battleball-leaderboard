import { cache } from 'react';

import 'server-only';

import { validateRequest } from '@/server/validate';

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
