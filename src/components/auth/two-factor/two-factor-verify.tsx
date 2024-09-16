'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { ConfirmationAlert } from '@/components/confirmation/confirmation-alert';
import { Button } from '@/components/ui/button';
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
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  disableTwoFactor,
  enableTwoFactor,
  validateTwoFactor,
} from '@/server/actions/auth/two-factor/two-factor';

const schema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

interface TwoFactorVerifyProps {
  sessionId: string;
  action: 'enable' | 'disable';
}

export function TwoFactorVerify({ sessionId, action }: TwoFactorVerifyProps) {
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const result = await validateTwoFactor(sessionId, values.otp);

    if (result.success) {
      toast.success('Two-factor authentication has been enabled successfully!');
      setVerificationSuccess(true);
    } else {
      toast.error(
        'Failed to enable two-factor authentication. Contact the staff.',
      );
      form.setError('otp', { message: result.error });
    }
  };

  const handleConfirmDisable = async () => {
    const result = await disableTwoFactor(sessionId);
    if (result.success) {
      toast.success(
        'Two-factor authentication has been disabled successfully!',
      );
    } else {
      toast.error(
        'Failed to disable two-factor authentication. Contact the staff.',
      );
    }
  };

  if (verificationSuccess && action === 'enable') {
    return <p>Two-factor authentication has been enabled successfully!</p>;
  }

  if (verificationSuccess && action === 'disable') {
    return (
      <ConfirmationAlert
        message="Are you sure you want to disable two-factor authentication? This will make your account less secure."
        onConfirm={handleConfirmDisable}
        trigger={
          <Button variant="destructive">
            Disable Two-Factor Authentication
          </Button>
        }
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Enter the 6-digit code from your authenticator app
              </FormLabel>
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Verify</Button>
      </form>
    </Form>
  );
}
