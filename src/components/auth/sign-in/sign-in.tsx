import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInAction } from '@/server/actions/auth/sign-in';
import { auth } from '@/server/auth';

export const SignIn: React.FC = async () => {
  const session = await auth();
  if (session) redirect('/');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email to receive a magic link
        </CardDescription>
      </CardHeader>
      <form action={signInAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="email@example.com"
                required
                type="email"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Send me a magic link
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
