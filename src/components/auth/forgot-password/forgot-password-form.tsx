'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
    const response = await sendResetEmail(values.email);

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
    const response = await sendResetEmail(email);
    if (response.success) {
      toast.success('Password reset email sent successfully');
      setShowCountdown(true);
    } else {
      toast.error(response.error);
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isEmailSent}>
              Send Reset Email
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
        <div className="text-sm text-muted-foreground text-center w-full">
          Remember your password?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
