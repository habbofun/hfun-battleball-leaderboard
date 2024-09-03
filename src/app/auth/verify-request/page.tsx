import React from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@/server/auth';

export default async function VerifyRequest() {
  const session = await auth();
  if (session) redirect('/');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Check your email
        </h2>
        <p className="text-base sm:text-lg">
          A sign in link has been sent to your email address.
        </p>
      </div>
    </div>
  );
}
