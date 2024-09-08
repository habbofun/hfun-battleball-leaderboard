import React from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@/server/auth';

export default async function SignInPage() {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="text-center p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        <p className="text-lg">
          Thanks for signing up,{' '}
          <span className="font-semibold">{session.user?.email}</span>!
        </p>
      </div>
    </div>
  );
}
