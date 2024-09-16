'use client';

import { useState } from 'react';

import Image from 'next/image';

import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { TwoFactorVerify } from '@/components/auth/two-factor/two-factor-verify';
import { Button } from '@/components/ui/button';

interface TwoFactorSetupProps {
  uri: string;
  secret: string;
  qrCode: string;
  sessionId: string;
}

export function TwoFactorSetup({
  uri,
  secret,
  qrCode,
  sessionId,
}: TwoFactorSetupProps) {
  const [showVerify, setShowVerify] = useState(false);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret).then(
      () => {
        toast.success('Secret copied to clipboard');
      },
      () => {
        toast.error('Failed to copy secret');
      },
    );
  };

  if (showVerify) {
    return <TwoFactorVerify sessionId={sessionId} action="enable" />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">
        Set up Two-Factor Authentication
      </h2>
      <p className="text-center">
        Scan this QR code with your authenticator app:
      </p>
      <div className="p-4 rounded-lg bg-slate-600">
        <Image src={qrCode} alt="QR Code" width={200} height={200} />
      </div>
      <p className="text-center">Or enter this secret manually:</p>
      <div className="flex items-center space-x-2">
        <code className="bg-slate-600 p-2 rounded">{secret}</code>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopySecret}
          title="Copy secret"
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={() => setShowVerify(true)} className="w-full">
        I&apos;m ready to verify my token
      </Button>
    </div>
  );
}
