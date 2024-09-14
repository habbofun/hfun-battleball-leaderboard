import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PasswordSettings() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Change Password</h3>
      <form>
        <Input
          type="password"
          name="currentPassword"
          placeholder="Current password"
        />
        <Input
          type="password"
          name="newPassword"
          placeholder="New password"
          className="mt-2"
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          className="mt-2"
        />
        <Button type="submit" className="mt-2">
          Update Password
        </Button>
      </form>
    </div>
  );
}
