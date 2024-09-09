import HabboOnboarding from '@/components/auth/habbo/link-account';
import JsonView from '@/components/view/json-view';
import { auth } from '@/server/auth';

export default async function ProfilePage() {
  const session = await auth();
  const email = session?.user?.email || '';

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
    </div>
  );
}
