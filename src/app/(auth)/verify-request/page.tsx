import React from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@/server/auth';

export default async function VerifyRequest() {
  const session = await auth();
  if (session) redirect('/');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Check your email</h2>
        <p className="text-gray-600">
          A sign in link has been sent to your email address.
        </p>
      </div>
    </div>
  );
}
