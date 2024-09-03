import AccessDenied from '@/components/auth/access-denied';
import JsonView from '@/components/ui/json-view';
import { auth } from '@/server/auth';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) return <AccessDenied />;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl rounded-lg shadow-md overflow-hidden">
        <h1 className="text-3xl font-bold mb-4 p-6">Protected Page</h1>
        <div className="p-6 overflow-x-auto bg-zinc-900">
          <JsonView data={session} />
        </div>
      </div>
    </div>
  );
}
