import { Link } from 'next-view-transitions';

export function FormFooter() {
  return (
    <div className="text-sm text-muted-foreground text-center w-full">
      Remember your password?{' '}
      <Link
        href="/sign-in"
        className="font-medium text-primary hover:underline"
      >
        Sign in
      </Link>
    </div>
  );
}
