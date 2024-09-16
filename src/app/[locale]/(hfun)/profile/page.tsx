import { redirect } from 'next/navigation';

import { TwoFactorAuthButton } from '@/components/auth/two-factor/two-factor-button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCurrentSession, getCurrentUser } from '@/lib/session';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const session = await getCurrentSession();

  if (!user || !session) redirect('/sign-in');

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <Input value={user.username} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input value={user.email} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Role</Label>
              <Input value={user.role} readOnly />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <TwoFactorAuthButton
            sessionId={session.id}
            isTwoFactorEnabled={user.twoFactorEnabled}
            hasTwoFactorToken={user.hasTwoFactorToken}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
