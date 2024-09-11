'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { LoginFormFields } from '@/components/auth/login/login-form-fields';
import { FormFooter } from '@/components/auth/login/login-form-footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { type LoginSchema, loginSchema } from '@/schemas/auth';
import { signIn } from '@/server/actions/auth/sign-in';

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginSchema) => {
    const response = await signIn(values);

    if (!response.success && response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Logged in successfully');
    router.push('/');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        <CardDescription>Enter your credentials to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <LoginFormFields control={form.control} />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <FormFooter />
      </CardFooter>
    </Card>
  );
}
