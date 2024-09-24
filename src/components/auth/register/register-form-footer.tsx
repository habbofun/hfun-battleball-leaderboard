import { Link } from 'next-view-transitions';

export function FormFooter() {
  return (
    <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground w-full">
      <div>
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="font-medium text-primary hover:underline"
          replace
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
