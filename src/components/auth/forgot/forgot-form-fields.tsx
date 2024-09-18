import type { Control } from 'react-hook-form';

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
import { PasswordInput } from '@/components/ui/password-input';
import type { ForgotPasswordSchema } from '@/schemas/auth';

interface ForgotFormFieldsProps {
  control: Control<ForgotPasswordSchema>;
}

export function ForgotFormFields({ control }: ForgotFormFieldsProps) {
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
            <FormMessage />
          </FormItem>
        )}
      />
      <PasswordInput
        control={control}
        name="newPassword"
        label="New Password"
        description="Enter your new password"
      />
      <PasswordInput
        control={control}
        name="confirmPassword"
        label="Confirm New Password"
        description="Confirm your new password"
      />
    </>
  );
}
