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
import { PasswordInput } from '@/components/ui/password-input';
import { LoginSchema } from '@/schemas/auth';

interface LoginFormFieldsProps {
  control: Control<LoginSchema>;
}

export function LoginFormFields({ control }: LoginFormFieldsProps) {
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
    </>
  );
}
