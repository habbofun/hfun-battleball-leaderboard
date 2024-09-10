'use client';

import { useSession } from 'next-auth/react';

import HabboOnboarding from '@/components/auth/habbo/link-account';
import { LogoutButton } from '@/components/auth/logout/logout-button';
import { Button } from '@/components/ui/button';
import JsonView from '@/components/view/json-view';

export default function ProfilePage() {
  const session = useSession();
  const email = session?.data?.user?.email || '';

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p>You are not logged in</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <HabboOnboarding email={email} />
      <p className="text-2xm text-muted-foreground mt-8">Session details:</p>
      <JsonView
        data={session}
        className="max-w-2xl w-full text-sm rounded-lg shadow-lg"
      />
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
}
