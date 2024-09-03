import { auth } from '@/server/auth';

import { AuthStatus } from './auth-status';

export async function AuthStatusWrapper() {
  const session = await auth();
  return <AuthStatus session={session} />;
}
