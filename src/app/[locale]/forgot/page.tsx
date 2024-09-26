import { ForgotPasswordForm } from '@/components/auth/forgot/forgot-form';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Forgot password',
  });
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ForgotPasswordForm />
    </div>
  );
}
