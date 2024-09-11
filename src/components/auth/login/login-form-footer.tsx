import Link from 'next/link';

export function FormFooter() {
  return (
    <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground w-full">
      <Link href="/forgot-password" className="hover:underline">
        Forgot password?
      </Link>
      <div>
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
