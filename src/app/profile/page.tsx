import AccessDenied from '@/components/auth/access-denied';
import JsonView from '@/components/view/json-view';
import { auth } from '@/server/auth';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) return <AccessDenied />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="text-2xm text-muted-foreground">Session details:</p>
      <JsonView
        data={session}
        className="max-w-2xl w-full text-sm rounded-lg shadow-lg"
      />
    </div>
  );
}
