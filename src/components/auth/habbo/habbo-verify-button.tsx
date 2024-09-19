'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LinkIcon, UnlinkIcon } from 'lucide-react';
import { toast } from 'sonner';

import { ConfirmationAlert } from '@/components/confirmation/confirmation-alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { unlinkHabboAccount } from '@/server/actions/auth/habbo/account';

import { HabboVerifyForm } from './habbo-verify-form';

interface HabboVerifyButtonProps {
  userId: string;
  isVerified: boolean;
  verifiedUsername?: string | null;
}

export function HabboVerifyButton({
  userId,
  isVerified,
  verifiedUsername,
}: HabboVerifyButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  const handleUnlink = async () => {
    const result = await unlinkHabboAccount(userId);
    if (result.success) {
      toast.success('Habbo account unlinked successfully');
      router.refresh();
    } else {
      toast.error(result.error || 'Failed to unlink Habbo account');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset the form when the dialog is closed
      setKey((prevKey) => prevKey + 1);
    }
  }, [isOpen]);

  if (isVerified) {
    return (
      <ConfirmationAlert
        message="Are you sure you want to unlink your Habbo account? This action cannot be undone."
        onConfirm={handleUnlink}
        trigger={
          <Button variant="destructive">
            <UnlinkIcon className="mr-2 h-4 w-4" />
            Unlink Habbo Account
          </Button>
        }
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <LinkIcon className="mr-2 h-4 w-4" />
          Verify Habbo Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Habbo Account</DialogTitle>
        </DialogHeader>
        <HabboVerifyForm
          key={key}
          userId={userId}
          isVerified={isVerified}
          verifiedUsername={verifiedUsername}
        />
      </DialogContent>
    </Dialog>
  );
}
