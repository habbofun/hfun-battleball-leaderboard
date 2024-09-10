'use client';

import HabboOnboarding from '@/components/auth/habbo/link-account';
import JsonView from '@/components/view/json-view';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function SettingsPage() {
  const user = useCurrentUser();
  const email = user?.email || '';

  if (!user) {
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
        data={user}
        className="max-w-2xl w-full text-sm rounded-lg shadow-lg"
      />
    </div>
  );
}