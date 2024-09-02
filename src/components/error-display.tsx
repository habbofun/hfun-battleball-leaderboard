import { AlertCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface ErrorDisplayProps {
  message: string;
  title?: string;
}

export function ErrorDisplay({ message, title = 'Error' }: ErrorDisplayProps) {
  return (
    <div className="my-4 flex flex-col items-center justify-center rounded-md border border-destructive bg-destructive/10 p-4">
      <div className="mb-2 flex items-center">
        <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
        <Badge variant="destructive">{title}</Badge>
      </div>
      <p className="text-center text-destructive">{message}</p>
    </div>
  );
}
