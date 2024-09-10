'use client';

import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <span onClick={handleLogout} className="cursor-pointer">
      {children}
    </span>
  );
};
