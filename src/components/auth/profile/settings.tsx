import React from 'react';

import { EmailSettings } from '@/components/auth/profile/settings/email-settings';
import { PasswordSettings } from '@/components/auth/profile/settings/password-settings';
import { TwoFactorSettings } from '@/components/auth/profile/settings/two-factor-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateRequest } from '@/server/validate';

export async function ProfileSettings() {
  const { user } = await validateRequest();

  if (!user) {
    return <div className="text-center">User not found</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <EmailSettings currentEmail={user.email} />
        <PasswordSettings />
        <TwoFactorSettings isEnabled={user.twoFactorEnabled} />
      </CardContent>
    </Card>
  );
}
