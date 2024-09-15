import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/data/session';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-2">Profile</h1>

      <p>Welcome, {user.username}!</p>
      <p className="text-muted-foreground">Your email is {user.email}</p>
    </div>
  );
}
