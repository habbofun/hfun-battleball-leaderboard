import { Control } from 'react-hook-form';

import { Mail } from 'lucide-react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';
import { LoginSchema } from '@/schemas/auth';

interface LoginFormFieldsProps {
  control: Control<LoginSchema>;
  showTwoFactor: boolean;
}

export function LoginFormFields({
  control,
  showTwoFactor,
}: LoginFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
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
            <FormDescription>
              Enter the email associated with your account.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <PasswordInput
        control={control}
        name="password"
        label="Password"
        description="Enter your account password."
      />
      {showTwoFactor && (
        <FormField
          control={control}
          name="twoFactorCode"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Two-Factor Code</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormDescription className="text-center">
                Enter the 6-digit code from your authenticator app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
