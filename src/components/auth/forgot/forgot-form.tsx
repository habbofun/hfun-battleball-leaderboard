'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { ForgotFormFields } from '@/components/auth/forgot/forgot-form-fields';
import { FormFooter } from '@/components/auth/forgot/forgot-form-footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Countdown } from '@/components/ui/countdown';
import { Form } from '@/components/ui/form';
import {
  type ForgotPasswordSchema,
  forgotPasswordSchema,
} from '@/schemas/auth';
import { sendResetEmail } from '@/server/actions/auth/send-reset-email/send-reset-email';

export function ForgotPasswordForm() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordSchema) => {
    const response = await sendResetEmail(values.email, values.newPassword);

    if (!response.success && response.error) {
      toast.error(response.error);
      return;
    }

    setIsEmailSent(true);
    setEmail(values.email);
    setShowCountdown(true);
    toast.success(
      'We have sent a password reset email to your inbox. Please check your email to continue.',
    );
  };

  const handleResendEmail = async () => {
    const values = form.getValues();

    if (values.newPassword !== values.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const response = await sendResetEmail(values.email, values.newPassword);
    if (response.success) {
      toast.success('Password reset email sent successfully');
      setShowCountdown(true);
    } else {
      toast.error(response.error || 'Failed to send reset email');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ForgotFormFields control={form.control} />
            <Button type="submit" className="w-full" disabled={isEmailSent}>
              Reset Password
            </Button>
          </form>
        </Form>
        {isEmailSent && (
          <div className="mt-4">
            {showCountdown ? (
              <Countdown
                initialCount={60}
                onResend={handleResendEmail}
                resendButtonText="Resend Reset Email"
                className="justify-between w-full"
              />
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendEmail}
                disabled={showCountdown}
              >
                Resend Reset Email
              </Button>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <FormFooter />
      </CardFooter>
    </Card>
  );
}
