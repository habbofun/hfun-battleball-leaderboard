import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function UserAuthButton() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
