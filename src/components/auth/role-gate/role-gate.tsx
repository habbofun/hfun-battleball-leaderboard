import { redirect } from 'next/navigation';

import type { Role } from '@prisma/client';

import { NotLoggedIn } from '@/components/auth/not-logged-in';
import { getCurrentUserRole } from '@/lib/session';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const role = await getCurrentUserRole();

  if (!role) {
    return <NotLoggedIn />;
  }

  if (role !== allowedRole) {
    redirect('/access-denied');
  }

  return <>{children}</>;
};
