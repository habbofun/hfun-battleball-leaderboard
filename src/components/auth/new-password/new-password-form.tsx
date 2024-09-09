'use client';

import React, { Suspense } from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { newPasswordSchema } from '@/lib/zod';
import { newPasswordAction } from '@/server/actions/auth/new-password/new-password';

function NewPasswordFormContent() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof newPasswordSchema>) => {
    startTransition(async () => {
      const response = await newPasswordAction(data, token);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      toast.success('Your password has been updated. Please login.');
      router.push('/login');
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Enter a new password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Sending...' : 'Change password'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function NewPasswordForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <NewPasswordFormContent />
      </Suspense>
    </div>
  );
}
