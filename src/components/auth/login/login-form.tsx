'use client';

import React, { useState } from 'react';

import InitialLoginForm from '@/components/auth/login/initial-login-form';
import TwoFactorForm from '@/components/auth/login/two-factor-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginForm() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {showTwoFactor ? 'Two-Factor Authentication' : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showTwoFactor ? (
            <InitialLoginForm
              onTwoFactorRequired={(email, password) => {
                setShowTwoFactor(true);
                setEmail(email);
                setPassword(password);
              }}
            />
          ) : (
            <TwoFactorForm email={email} password={password} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
