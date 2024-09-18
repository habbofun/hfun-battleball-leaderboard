import type { Control } from 'react-hook-form';

import { Mail, User } from 'lucide-react';

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
import type { RegisterSchema } from '@/schemas/auth';

interface RegisterFormFieldsProps {
  control: Control<RegisterSchema>;
}

export function RegisterFormFields({ control }: RegisterFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter your username"
                  className="pl-8"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              This will be your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
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
              We&apos;ll never share your email with anyone else.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <PasswordInput
        control={control}
        name="password"
        label="Password"
        description="Use a strong, unique password for security."
      />
      <PasswordInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        description="Please re-enter your password to confirm."
      />
    </>
  );
}
