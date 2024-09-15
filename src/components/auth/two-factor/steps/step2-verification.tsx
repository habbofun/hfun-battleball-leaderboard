import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

interface Step2VerificationProps {
  onVerify: (code: string) => void;
  onBack: () => void;
}

export function Step2Verification({
  onVerify,
  onBack,
}: Step2VerificationProps) {
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="space-y-2 w-full max-w-xs">
        <Label htmlFor="verificationCode" className="text-center block">
          Enter the 6-digit code from your app
        </Label>
        <InputOTP
          value={verificationCode}
          onChange={setVerificationCode}
          maxLength={6}
          className="justify-center"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex justify-between w-full max-w-xs">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onVerify(verificationCode)}>Verify Code</Button>
      </div>
    </div>
  );
}
