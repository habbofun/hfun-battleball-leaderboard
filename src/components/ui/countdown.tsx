import React from 'react';

import { useCountdown } from 'usehooks-ts';

import { Button } from '@/components/ui/button';

interface CountdownProps {
  initialCount: number;
  onResend?: () => void;
  showResendButton?: boolean;
  resendButtonText?: string;
  className?: string;
}

export function Countdown({
  initialCount,
  onResend,
  showResendButton = true,
  resendButtonText = 'Resend',
  className = '',
}: CountdownProps) {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: initialCount,
      intervalMs: 1000,
    });

  React.useEffect(() => {
    startCountdown();
    return () => stopCountdown();
  }, [startCountdown, stopCountdown]);

  React.useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count, stopCountdown, resetCountdown]);

  const handleResend = () => {
    resetCountdown();
    onResend?.();
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showResendButton && (
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={count > 0 || !onResend}
        >
          {resendButtonText}
        </Button>
      )}
      {count > 0 && (
        <span className="text-sm text-muted-foreground">({count}s)</span>
      )}
    </div>
  );
}
