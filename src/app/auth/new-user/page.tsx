import React from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@/server/auth';

export default async function SignInPage() {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome!</h1>
        <p className="text-lg md:text-xl">
          Thanks for signing up,{' '}
          <span className="font-semibold">{session?.user?.email}</span>!
        </p>
      </div>
    </div>
  );
}
