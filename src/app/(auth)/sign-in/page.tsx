import React from 'react';

import { SignIn } from '@/components/auth/sign-in/sign-in';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignIn />
    </div>
  );
}
