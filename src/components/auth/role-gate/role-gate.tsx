'use client';

import { Role } from '@prisma/client';

import AccessDenied from '@/components/auth/access-denied';
import { useCurrentRole } from '@/hooks/use-current-role';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: Role;
  fallback?: React.ReactNode;
}

export const RoleGate = ({
  children,
  allowedRoles,
  fallback,
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    return fallback ?? <AccessDenied />;
  }

  return <>{children}</>;
};
