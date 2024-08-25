import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  totalSeconds: number;
}

export function CountdownTimer({ initialSeconds, totalSeconds }: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 0) {
          return totalSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-center mb-4">
      <p className="text-sm text-muted-foreground">Queue update in:</p>
      <p className="text-2xl font-bold">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </p>
    </div>
  );
}