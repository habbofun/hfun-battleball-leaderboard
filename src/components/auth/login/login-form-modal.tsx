'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { LoginFormFields } from '@/components/auth/login/login-form-fields';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/ui/countdown';
import { Form } from '@/components/ui/form';
import { type LoginSchema, loginSchema } from '@/schemas/auth';
import { sendVerificationEmail } from '@/server/actions/auth/send-verification-email/send-verification-email';
import { signIn } from '@/server/actions/auth/sign-in/sign-in';

export function LoginFormModal() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [isEmailNotVerified, setIsEmailNotVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const onSubmit = async (values: LoginSchema) => {
    const response = await signIn(values);

    if (!response.success && response.error) {
      if (response.error === 'Email not verified') {
        setIsEmailNotVerified(true);
        setEmail(values.email);
      } else if (response.error === 'Two-factor authentication required') {
        setShowTwoFactor(true);
        toast.info('Please enter your two-factor authentication code');
        return;
      } else {
        toast.error(response.error);
      }
      return;
    }

    if (response.success) {
      toast.success('Logged in successfully');
      router.push('/');
    }
  };

  const handleSendVerificationEmail = async () => {
    const response = await sendVerificationEmail(email);
    if (response.success) {
      toast.success('Verification email sent successfully');
      setShowCountdown(true);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <LoginFormFields
            control={form.control}
            showTwoFactor={showTwoFactor}
          />
          <Button type="submit" className="w-full">
            {showTwoFactor ? 'Verify' : 'Sign In'}
          </Button>
        </form>
      </Form>
      {isEmailNotVerified && (
        <div className="mt-4">
          {showCountdown ? (
            <Countdown
              initialCount={60}
              onResend={handleSendVerificationEmail}
              resendButtonText="Resend Verification Email"
              className="justify-between w-full"
            />
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleSendVerificationEmail}
              disabled={showCountdown}
            >
              Send Verification Email
            </Button>
          )}
        </div>
      )}
    </>
  );
}
