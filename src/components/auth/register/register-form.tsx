'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { RegisterFormFields } from '@/components/auth/register/register-form-fields';
import { FormFooter } from '@/components/auth/register/register-form-footer';
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
import { type RegisterSchema, registerSchema } from '@/schemas/auth';
import { sendVerificationEmail } from '@/server/actions/auth/send-verification-email/send-verification-email';
import { createAccount } from '@/server/actions/auth/sign-up/sign-up';

export function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);

  const onSubmit = async (values: RegisterSchema) => {
    const response = await createAccount(values);

    if (!response.success && response.error) {
      toast.error(response.error);
      return;
    }

    setIsEmailSent(true);
    setEmail(values.email);
    setShowCountdown(true);
    toast.success(
      'We have sent a verification email to your inbox. Please verify your email to continue.',
    );
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RegisterFormFields control={form.control} />
            <Button type="submit" className="w-full" disabled={isEmailSent}>
              Register
            </Button>
          </form>
        </Form>
        {isEmailSent && (
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
      </CardContent>
      <CardFooter>
        <FormFooter />
      </CardFooter>
    </Card>
  );
}
