import { AlertCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface ErrorDisplayProps {
  message: string;
  title?: string;
}

export function ErrorDisplay({ message, title = 'Error' }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 my-4 border border-destructive rounded-md bg-destructive/10">
      <div className="flex items-center mb-2">
        <AlertCircle className="h-5 w-5 text-destructive mr-2" />
        <Badge variant="destructive">{title}</Badge>
      </div>
      <p className="text-center text-destructive">{message}</p>
    </div>
  );
}
