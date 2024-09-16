'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

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
  InputOTPSeparator,
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
  const router = useRouter();
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const result = await validateTwoFactor(sessionId, values.otp);

    if (!result.success) {
      toast.error('Invalid two-factor code. Please try again.');
      form.setError('otp', { message: result.error });
      return;
    }

    setVerificationSuccess(true);

    if (action === 'enable') {
      const enableResult = await enableTwoFactor(sessionId);
      if (!enableResult.success) {
        toast.error(
          'Failed to enable two-factor authentication. Please try again.',
        );
        return;
      }
      toast.success('Two-factor authentication has been enabled successfully!');
    } else {
      toast.success(
        'Two-factor code verified. You can now disable two-factor authentication.',
      );
    }

    router.refresh();
  };

  const handleConfirmDisable = async () => {
    const result = await disableTwoFactor(sessionId);
    if (!result.success) {
      toast.error(
        'Failed to disable two-factor authentication. Please try again.',
      );
      return;
    }

    toast.success('Two-factor authentication has been disabled successfully!');
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">
        {action === 'enable' ? 'Enable' : 'Disable'} Two-Factor Authentication
      </h2>
      {!verificationSuccess && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="otp"
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
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </Form>
      )}
      {verificationSuccess && action === 'enable' && (
        <p className="text-center text-green-600">
          Two-factor authentication has been enabled successfully!
        </p>
      )}
      {verificationSuccess && action === 'disable' && (
        <ConfirmationAlert
          message="Are you sure you want to disable two-factor authentication? This will make your account less secure."
          onConfirm={handleConfirmDisable}
          trigger={
            <Button variant="destructive" className="w-full">
              Disable Two-Factor Authentication
            </Button>
          }
        />
      )}
    </div>
  );
}
