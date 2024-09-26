import { LoginForm } from '@/components/auth/login/login-form';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Sign in',
  });
}

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoginForm />
    </div>
  );
}
