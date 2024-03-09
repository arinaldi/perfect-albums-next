'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckIcon,
  CopyIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons';
import { toast } from 'sonner';

import AppLayout from '@/components/AppLayout';
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
import Spinner from '@/components/Spinner';
import { useSubmit } from '@/hooks/useSubmit';
import { EMAIL } from '@/utils/constants';
import { emailSchema, type EmailInput } from './schema';
import OtpForm from './OtpForm';
import PasswordForm from './PasswordForm';
import { sendOtp } from './actions';

type View = 'email' | 'password' | 'otp';

export default function SignIn() {
  const [view, setView] = useState<View>('email');
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const form = useForm<EmailInput>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });
  const email = form.watch('email');

  async function onCopy() {
    try {
      clearTimeout(timeoutId);
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      const id = setTimeout(() => {
        setCopied(false);
        setTimeoutId(undefined);
      }, 2000);

      setTimeoutId(id);
    } catch (error) {
      toast.error('Failed to copy');
    }
  }

  function onEmailSubmit() {
    if (email !== EMAIL) {
      toast.error('Invalid email');
    } else {
      setView('password');
    }
  }

  const { isSubmitting, onSubmit: onOtpSubmit } = useSubmit({
    callbacks: [() => setView('otp')],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ email }: EmailInput) => {
      if (email !== EMAIL) {
        throw new Error('Invalid email');
      }

      await sendOtp(email);
    },
    successMessage: 'Check your email for the code',
  });

  function onCancel() {
    setView('email');
  }

  if (view === 'email') {
    return (
      <>
        <AppLayout className="max-w-sm" title="Sign in">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onEmailSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        autoFocus
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                <EnvelopeClosedIcon className="mr-2 size-4" />
                Sign in with email
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={onOtpSubmit}>
              <Button
                className="w-full"
                disabled={isSubmitting}
                type="submit"
                variant="outline"
              >
                {isSubmitting ? (
                  <Spinner className="mr-2 size-4" />
                ) : (
                  <PaperPlaneIcon className="mr-2 size-4" />
                )}
                One-time password
              </Button>
            </form>
          </Form>
        </AppLayout>
        <Button
          className="fixed bottom-1 left-1"
          disabled={copied}
          onClick={onCopy}
          size="icon"
          variant="ghost"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </>
    );
  }

  if (view === 'password') {
    return <PasswordForm email={email} onCancel={onCancel} />;
  }

  if (view === 'otp') {
    return <OtpForm email={email} onCancel={onCancel} />;
  }
}
