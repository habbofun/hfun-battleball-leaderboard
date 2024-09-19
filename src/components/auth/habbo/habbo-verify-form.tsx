'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
import {
  generateHabboVerificationToken,
  verifyHabboAccount,
} from '@/server/actions/auth/habbo/account';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
});

interface HabboVerifyFormProps {
  userId: string;
  isVerified: boolean;
  verifiedUsername?: string | null;
}

export function HabboVerifyForm({
  userId,
  isVerified,
  verifiedUsername,
}: HabboVerifyFormProps) {
  const router = useRouter();
  const [verificationToken, setVerificationToken] = useState<string | null>(
    null,
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: verifiedUsername || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (verificationToken) {
      await verifyAccount();
      return;
    }

    await generateToken(values.username);
  };

  const generateToken = async (username: string) => {
    const result = await generateHabboVerificationToken(userId, username);

    if (!result.success || !result.token) {
      toast.error(result.error || 'Failed to generate verification token');
      return;
    }

    setVerificationToken(result.token);
    toast.success(
      'Verification token generated. Please update your Habbo motto with this token.',
    );
  };

  const verifyAccount = async () => {
    if (!verificationToken) return;

    const result = await verifyHabboAccount(verificationToken);

    if (!result.success) {
      toast.error(result.error || 'Failed to verify Habbo account');
      return;
    }

    toast.success('Habbo account verified successfully');
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habbo Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={!!verificationToken} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {verificationToken && (
          <div className="text-sm">
            Please update your Habbo motto with this token:{' '}
            <strong>{verificationToken}</strong>
          </div>
        )}
        <Button type="submit">
          {verificationToken
            ? 'Verify Account'
            : isVerified
              ? 'Update Account'
              : 'Generate Token'}
        </Button>
      </form>
    </Form>
  );
}
