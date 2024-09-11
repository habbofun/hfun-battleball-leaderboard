'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { RegisterFormFields } from '@/components/auth/register/register-form-fields';
import { FormFooter } from '@/components/auth/register/register-form-footer';
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
import { type RegisterSchema, registerSchema } from '@/schemas/auth';
import { createAccount } from '@/server/actions/auth/sign-up/sign-up';

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterSchema) => {
    const response = await createAccount(values);

    if (!response.success && response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Account created successfully');
    router.push('/');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RegisterFormFields control={form.control} />
            <Button type="submit" className="w-full">
              Register
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
