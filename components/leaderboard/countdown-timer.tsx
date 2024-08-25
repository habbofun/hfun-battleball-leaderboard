import { useState, useEffect } from "react";

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
        <div className="text-center mb-4 text-sm sm:text-base">
            <p>Next update in: {minutes}m {seconds}s</p>
        </div>
    );
}