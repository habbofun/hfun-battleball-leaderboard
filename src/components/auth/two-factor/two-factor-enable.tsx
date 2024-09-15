'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { generatetwoFactorTokenAndUri } from '@/server/actions/auth/two-factor/two-factor';
import { validateTwoFactor } from '@/server/actions/auth/two-factor/validate-two-factor';

import { Step1QRCode } from './steps/step1-qr-code';
import { Step2Verification } from './steps/step2-verification';
import { Step3Confirmation } from './steps/step3-confirmation';

interface TwoFactorAuthSetupProps {
  sessionId: string;
}

export default function TwoFactorAuthSetup({
  sessionId,
}: TwoFactorAuthSetupProps) {
  const [step, setStep] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateToken = async () => {
      setIsLoading(true);
      const response = await generatetwoFactorTokenAndUri(sessionId);
      if (response.success && response.secret && response.qrCode) {
        setToken(response.secret);
        setQrCode(response.qrCode);
      } else {
        toast.error(response.error || 'Failed to generate token');
      }
      setIsLoading(false);
    };
    generateToken();
  }, [sessionId]);

  const handleVerification = async (code: string) => {
    setIsLoading(true);
    const response = await validateTwoFactor(sessionId, code);
    if (response.success) {
      setIsVerified(true);
      setStep(3);
    } else {
      toast.error(response.error || 'Verification failed');
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Two-Factor Authentication Setup
        </CardTitle>
        <CardDescription>Enhance the security of your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <Step1QRCode
                token={token}
                qrCode={qrCode}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2Verification
                onVerify={handleVerification}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3Confirmation
                isVerified={isVerified}
                onFinish={() => {
                  toast.success('Two-factor authentication setup complete');
                }}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
