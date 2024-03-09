'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeClosedIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

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
import { emailSchema, type EmailInput } from './schema';
import OtpForm from './OtpForm';
import PasswordForm from './PasswordForm';
import { sendOtp } from './actions';

type View = 'email' | 'password' | 'otp';

export default function SignIn() {
  const [view, setView] = useState<View>('email');
  const form = useForm<EmailInput>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });
  const email = form.watch('email');

  function onEmailSubmit() {
    setView('password');
  }

  const { isSubmitting, onSubmit: onOtpSubmit } = useSubmit({
    callbacks: [() => setView('otp')],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: EmailInput) => {
      await sendOtp(data.email);
    },
    successMessage: 'Check your email for the code',
  });

  function onCancel() {
    setView('email');
  }

  if (view === 'email') {
    return (
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
            <Input className="hidden" id="name" name="name" tabIndex={-1} />
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
    );
  }

  if (view === 'password') {
    return <PasswordForm email={email} onCancel={onCancel} />;
  }

  if (view === 'otp') {
    return <OtpForm email={email} onCancel={onCancel} />;
  }
}
