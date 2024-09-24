'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { LoginFormFields } from '@/components/auth/login/login-form-fields';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/ui/countdown';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { type LoginSchema, loginSchema } from '@/schemas/auth';
import { sendVerificationEmail } from '@/server/actions/auth/send-verification-email/send-verification-email';
import { signIn } from '@/server/actions/auth/sign-in/sign-in';

export function LoginFormModal() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      twoFactorCode: '',
    },
  });

  const router = useRouter();
  const [isEmailNotVerified, setIsEmailNotVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);

  const onSubmit = async (values: LoginSchema) => {
    const response = await signIn(values);

    if (!response.success) {
      if (response.error === 'Email not verified') {
        setIsEmailNotVerified(true);
        setEmail(values.email);
      } else if (response.requiresTwoFactor) {
        setShowTwoFactor(true);
        setUserId(response.userId);
        toast.info('Please enter your two-factor authentication code');
        return;
      } else {
        toast.error(response.error || 'An error occurred during sign-in');
      }
      return;
    }

    if (response.success) {
      toast.success('Logged in successfully');
      router.push('/');
    }
  };

  const handleTwoFactorSubmit = async (values: LoginSchema) => {
    if (!userId) {
      toast.error('An error occurred. Please try again.');
      return;
    }

    const response = await signIn({
      ...values,
      twoFactorCode: values.twoFactorCode,
    });

    if (response.success) {
      toast.success('Logged in successfully');
      router.push('/');
    } else {
      toast.error(
        response.error || 'Invalid two-factor code. Please try again.',
      );
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
        <form
          onSubmit={form.handleSubmit(
            showTwoFactor ? handleTwoFactorSubmit : onSubmit,
          )}
          className="space-y-4"
        >
          <LoginFormFields
            control={form.control}
            showTwoFactor={showTwoFactor}
          />
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="twoFactorCode"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-center block mb-2">
                    Enter the 6-digit code from your authenticator app
                  </FormLabel>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
