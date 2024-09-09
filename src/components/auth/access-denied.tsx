import { AlertCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccessDeniedProps {
  message?: string;
}

export default function AccessDenied({ message }: AccessDeniedProps) {
  const defaultMessage = "You don't have permission to access this page.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto text-destructive w-16 h-16 mb-4" />
          <CardTitle className="text-2xl">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            {message || defaultMessage}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
