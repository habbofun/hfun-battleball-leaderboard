import { RegisterForm } from '@/components/auth/register/register-form';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Sign up',
  });
}

export default function SignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <RegisterForm />
    </div>
  );
}
