'use client';

import { useState } from 'react';

import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateHabboToken } from '@/lib/utils';
import { verifyHabboOwnership } from '@/server/actions/auth/habbo/verify-ownership';

interface HabboOnboardingProps {
  email: string;
}

export default function HabboOnboarding({ email }: HabboOnboardingProps) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [motto, setMotto] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(
    null,
  );

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      setMotto(generateHabboToken());
      setStep(2);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    const result = await verifyHabboOwnership(username, email, motto);
    setVerificationResult(result.verified);
    setIsVerifying(false);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Habbo Onboarding</CardTitle>
        <CardDescription>Link your Habbo account</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <form onSubmit={handleUsernameSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Habbo Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your Habbo username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">
              Next
            </Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerification}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="motto">Set this as your Habbo motto:</Label>
                <Input id="motto" value={motto} readOnly />
              </div>
              <p className="text-sm text-muted-foreground">
                Please set the above text as your Habbo motto (in-game status),
                then click the button below to verify.
              </p>
            </div>
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify Ownership'}
            </Button>
          </form>
        )}
      </CardContent>
      {verificationResult !== null && (
        <CardFooter>
          {verificationResult ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="mr-2" />
              Verification successful!
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <AlertCircle className="mr-2" />
              Verification failed. Please try again.
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
