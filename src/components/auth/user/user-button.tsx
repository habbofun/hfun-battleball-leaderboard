import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { logout } from '@/server/actions/auth/logout/logout';
import { validateRequest } from '@/server/validate';

export default async function UserButton() {
  const { user } = await validateRequest();

  return (
    <div className="flex items-center space-x-4">
      {user && (
        <>
          <Link href="/profile/settings">
            <Button variant="ghost">Settings</Button>
          </Link>
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
