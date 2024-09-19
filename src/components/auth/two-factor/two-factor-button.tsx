'use client';

import { useState } from 'react';

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
  icon?: React.ReactNode;
}

export function TwoFactorAuthButton({
  sessionId,
  isTwoFactorEnabled,
  hasTwoFactorToken,
  icon,
}: TwoFactorAuthButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isTwoFactorEnabled ? 'destructive' : 'default'}>
          {icon}
          {isTwoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Auth
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isTwoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor
            Authentication
          </DialogTitle>
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
    </Dialog>
  );
}
