import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
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
import { sendOtp } from './actions';
import type { EmailInput } from './schema';

interface Props {
  form: UseFormReturn<EmailInput>;
  setViewOtp: () => void;
  setViewPassword: () => void;
}

export default function EmailForm({
  form,
  setViewOtp,
  setViewPassword,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  async function onCopy() {
    try {
      clearTimeout(timeoutId);
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      const id = setTimeout(() => {
        setCopied(false);
        setTimeoutId(undefined);
      }, 3000);

      setTimeoutId(id);
    } catch (error) {
      toast.error('Failed to copy');
    }
  }

  function onEmailSubmit() {
    if (form.watch('email') !== EMAIL) {
      toast.error('Invalid email');
    } else {
      setViewPassword();
    }
  }

  const { isSubmitting, onSubmit: onOtpSubmit } = useSubmit({
    callbacks: [() => setViewOtp()],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ email }: EmailInput) => {
      if (email !== EMAIL) {
        throw new Error('Invalid email');
      }

      await sendOtp(email);
    },
    successMessage: 'Check your email for the code',
  });

  return (
    <>
      <AppLayout className="max-w-sm" title="Sign in">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onEmailSubmit)}>
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
            <Button className="mt-6 w-full" type="submit">
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
        className="absolute bottom-1 left-1"
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
