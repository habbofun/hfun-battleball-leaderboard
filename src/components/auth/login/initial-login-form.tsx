import React from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/schemas';
import { loginAction } from '@/server/actions/auth/login/login-action';

interface InitialLoginFormProps {
  onTwoFactorRequired: (email: string, password: string) => void;
}

export default function InitialLoginForm({
  onTwoFactorRequired,
}: InitialLoginFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await loginAction(data);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.twoFactor) {
        onTwoFactorRequired(data.email, data.password);
        toast.info('Please enter the 2FA code sent to your email');
        return;
      }

      if (response.success) {
        toast.success('Login successful');
        router.push('/settings');
        return;
      }

      toast.error('An unexpected error occurred');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <Button
                size="sm"
                variant="link"
                asChild
                className="p-0 text-sm font-normal"
              >
                <Link href="/reset-password">Forgot password?</Link>
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
