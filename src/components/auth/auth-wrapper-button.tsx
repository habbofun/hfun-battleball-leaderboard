import Link from 'next/link';

import { LogIn, UserPlus } from 'lucide-react';

import { LogoutButton } from '@/components/auth/logout/logout-button';
import { Button } from '@/components/ui/button';
import { auth } from '@/server/auth';

export async function AuthWrapperButton() {
  const session = await auth();

  return (
    <div className="flex items-center space-x-2">
      {session ? (
        <LogoutButton />
      ) : (
        <>
          <Link href="/login" passHref>
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="ghost" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
