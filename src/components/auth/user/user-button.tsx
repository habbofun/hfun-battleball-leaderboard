import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/session';
import { logout } from '@/server/actions/auth/logout/logout';

export default async function UserButton() {
  const user = await getCurrentUser();

  return (
    <div className="flex items-center space-x-4">
      {user && (
        <>
          <Button asChild variant="link">
            <Link href="/profile">Profile</Link>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="ghost">
              Logout
            </Button>
          </form>
        </>
      )}
      {!user && (
        <>
          <Button asChild variant="ghost">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/sign-up">Register</Link>
          </Button>
        </>
      )}
    </div>
  );
}
