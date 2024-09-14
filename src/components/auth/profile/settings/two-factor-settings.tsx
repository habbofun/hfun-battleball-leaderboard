import React from 'react';

import { Button } from '@/components/ui/button';

export function TwoFactorSettings({ isEnabled }: { isEnabled: boolean }) {
  const statusColor = isEnabled ? 'text-green-500' : 'text-red-500';
  const statusText = isEnabled ? 'enabled' : 'disabled';

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
      <p className={`text-sm ${statusColor}`}>
        Two-Factor Authentication is currently {statusText}
      </p>
      <form>
        <Button type="submit" variant={isEnabled ? 'destructive' : 'default'}>
          {isEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
        </Button>
      </form>
    </div>
  );
}
