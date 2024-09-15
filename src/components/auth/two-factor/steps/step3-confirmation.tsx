import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Step3ConfirmationProps {
  isVerified: boolean;
  onFinish: () => void;
}

export function Step3Confirmation({
  isVerified,
  onFinish,
}: Step3ConfirmationProps) {
  return (
    <div className="space-y-4">
      {isVerified ? (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          <span>Two-factor authentication is now enabled!</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>Verification failed. Please try again.</span>
        </div>
      )}
      <Button onClick={onFinish} className="w-full">
        Finish Setup
      </Button>
    </div>
  );
}
