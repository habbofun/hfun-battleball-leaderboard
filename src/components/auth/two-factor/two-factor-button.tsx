'use client';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { DisableTwoFactor } from './disable-two-factor';
import { EnableTwoFactor } from './enable-two-factor';

interface TwoFactorAuthButtonProps {
  sessionId: string;
  isTwoFactorEnabled: boolean;
  hasTwoFactorToken: boolean;
}

export function TwoFactorAuthButton({
  sessionId,
  isTwoFactorEnabled,
  hasTwoFactorToken,
}: TwoFactorAuthButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const dialogContent = useMemo(
    () => (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Two-Factor Authentication</DialogTitle>
        </DialogHeader>
        {isTwoFactorEnabled ? (
          <DisableTwoFactor sessionId={sessionId} />
        ) : (
          <EnableTwoFactor
            sessionId={sessionId}
            hasTwoFactorToken={hasTwoFactorToken}
          />
        )}
      </DialogContent>
    ),
    [sessionId, isTwoFactorEnabled, hasTwoFactorToken],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={isTwoFactorEnabled ? 'destructive' : 'default'}>
          {isTwoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
        </Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
