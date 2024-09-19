'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, CopyIcon, LoaderIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: verifiedUsername || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    if (verificationToken) {
      await verifyAccount();
    } else {
      await generateToken(values.username);
    }
    setIsLoading(false);
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

  const copyToClipboard = () => {
    if (verificationToken) {
      navigator.clipboard.writeText(verificationToken);
      toast.success('Verification token copied to clipboard');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habbo Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    className="pl-8"
                    disabled={!!verificationToken || isLoading}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter your Habbo username to start the verification process.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {verificationToken && (
          <div className="space-y-2">
            <FormLabel>Verification Token</FormLabel>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-muted p-2 rounded-md font-mono text-sm">
                {verificationToken}
              </code>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <FormDescription>
              Update your Habbo motto with this token, then click &apos;Verify
              Account&apos; to complete the process.
            </FormDescription>
          </div>
        )}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              {verificationToken ? 'Verifying...' : 'Generating...'}
            </>
          ) : verificationToken ? (
            <>
              <CheckIcon className="mr-2 h-4 w-4" />
              Verify Account
            </>
          ) : (
            'Generate Token'
          )}
        </Button>
      </form>
    </Form>
  );
}
