import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export async function EmailSettings({
  currentEmail,
}: {
  currentEmail: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Change Email</h3>
      <form>
        <Input type="email" name="email" placeholder={currentEmail} />
        <Button type="submit" className="mt-2">
          Update Email
        </Button>
      </form>
    </div>
  );
}
