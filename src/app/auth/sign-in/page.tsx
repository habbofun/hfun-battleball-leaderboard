import React from 'react';

import { redirect } from 'next/navigation';

import { SignIn } from '@/components/auth/sign-in';
import { auth } from '@/server/auth';

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect('/');

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignIn />
      </div>
    </div>
  );
}
