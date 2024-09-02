import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
					toast.info('Queue updated!');
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
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="mb-4 text-center">
						<p className="text-s text-muted-foreground">Queue updates in:</p>
						<p className="text-2xl font-bold">
							{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
						</p>
						<p className="text-xs text-muted-foreground">Hover to see more info.</p>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>When this timer finishes, the top 45 users will be added to the queue to be updated.</p>
					<p>
						Check the queue order and progress in our{' '}
						<a
							href="https://discord.gg/originses"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:underline"
						>
							Discord
						</a>{' '}
						server panel.
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
