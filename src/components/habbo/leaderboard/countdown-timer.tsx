import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { CountdownTimerSkeleton } from '@/components/habbo/leaderboard/countdown-timer-skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CountdownTimerProps {
  initialSeconds: number;
  totalSeconds: number;
  onComplete?: () => void;
  label: string;
  tooltipContent: React.ReactNode;
  toastMessage?: string;
}

export function CountdownTimer({
  initialSeconds,
  totalSeconds,
  onComplete,
  label,
  tooltipContent,
  toastMessage = 'Timer completed!',
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 0) {
          toast.info(toastMessage);
          onComplete?.();
          return totalSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds, onComplete, toastMessage]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  if (secondsLeft === null) return <CountdownTimerSkeleton />;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="text-center mb-4">
            <p className="text-s text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
            <p className="text-xs text-muted-foreground">
              Hover to see more info.
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
