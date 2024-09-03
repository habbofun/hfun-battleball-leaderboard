import { auth } from '@/server/auth';

export default async function MePage() {
  const session = await auth();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center p-4 shadow-md rounded-lg max-w-sm w-full text-sm sm:text-base md:text-lg">
        {session?.user
          ? `Signed in as ${session.user?.email}.`
          : 'You are not signed in.'}
      </p>
    </div>
  );
}
