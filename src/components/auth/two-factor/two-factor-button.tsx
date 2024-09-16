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

interface TwoFactorAuthButtonProps {
  sessionId: string;
  isTwoFactorEnabled: boolean;
}

export function TwoFactorAuthButton({
  sessionId,
  isTwoFactorEnabled,
}: TwoFactorAuthButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isTwoFactorEnabled ? 'destructive' : 'default'}>
          {isTwoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account Security</DialogTitle>
        </DialogHeader>
        {isTwoFactorEnabled ? (
          <p>Flow to disable two-factor authentication</p>
        ) : (
          <p>Flow to enable two-factor authentication</p>
        )}
      </DialogContent>
    </Dialog>
  );
}