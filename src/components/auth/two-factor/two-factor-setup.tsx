'use client';

import { useState } from 'react';

import Image from 'next/image';

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

  if (showVerify) {
    return <TwoFactorVerify sessionId={sessionId} action="enable" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Set up Two-Factor Authentication
      </h2>
      <p>Scan this QR code with your authenticator app:</p>
      <Image src={qrCode} alt="QR Code" width={200} height={200} />
      <p>Or enter this secret manually: {secret}</p>
      <Button onClick={() => setShowVerify(true)}>
        I&apos;m ready to verify my token
      </Button>
    </div>
  );
}
