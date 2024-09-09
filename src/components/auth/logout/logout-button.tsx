'use client';

import { useTransition } from 'react';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/server/actions/auth/logout/logout-action';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="ghost"
      size="sm"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
