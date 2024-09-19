import { redirect } from 'next/navigation';

import { CheckCircle2Icon, ShieldIcon, XCircleIcon } from 'lucide-react';

import { HabboVerifyButton } from '@/components/auth/habbo/habbo-verify-button';
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

      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={user.username} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={user.role} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Email</Label>
                <VerificationStatus isVerified={user.emailVerified} />
              </div>
              <Input value={user.email} readOnly />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Habbo Username</Label>
                <VerificationStatus isVerified={!!user.habboVerifiedUsername} />
              </div>
              <Input
                value={user.habboVerifiedUsername || 'Not verified'}
                readOnly
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 justify-center w-full">
            <TwoFactorAuthButton
              sessionId={session.id}
              isTwoFactorEnabled={user.twoFactorEnabled}
              hasTwoFactorToken={user.hasTwoFactorToken}
              icon={<ShieldIcon className="mr-2 h-4 w-4" />}
            />
            <HabboVerifyButton
              userId={user.id}
              isVerified={!!user.habboVerifiedUsername}
              verifiedUsername={user.habboVerifiedUsername}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function VerificationStatus({ isVerified }: { isVerified: boolean }) {
  return (
    <div className="flex items-center">
      {isVerified ? (
        <>
          <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-sm text-green-500 font-medium">Verified</span>
        </>
      ) : (
        <>
          <XCircleIcon className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-sm text-red-500 font-medium">Not verified</span>
        </>
      )}
    </div>
  );
}
