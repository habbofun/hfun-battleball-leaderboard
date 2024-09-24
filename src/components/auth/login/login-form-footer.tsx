import { Link } from 'next-view-transitions';

export function FormFooter() {
  return (
    <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground w-full">
      <Link href="/forgot" className="hover:underline">
        Forgot password?
      </Link>
      <div>
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:underline"
          replace
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
