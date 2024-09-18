'use client';

import { Button } from '@/components/ui/button';

export function TryAgainButton() {
  return <Button onClick={() => window.location.reload()}>Try Again</Button>;
}
