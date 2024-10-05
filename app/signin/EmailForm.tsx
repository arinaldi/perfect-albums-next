import { UseFormReturn } from 'react-hook-form';
import { LockClosedIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

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
import SubmitButton from '@/components/SubmitButton';
import { useMediaQuery } from '@/hooks/media-query';
import { useSubmit } from '@/hooks/submit';
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
  const isDesktop = useMediaQuery();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => setViewOtp()],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: EmailInput) => {
      const result = await sendOtp(data.email);

      if (result.message) {
        throw new Error(result.message);
      }
    },
    successMessage: 'Check your email for the code',
  });

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(setViewPassword)}>
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
          <Button
            className="mt-6 w-full"
            size={isDesktop ? 'default' : 'lg'}
            type="submit"
          >
            <LockClosedIcon className="mr-2 size-4" />
            Sign in with password
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <SubmitButton
            className="w-full"
            submitting={submitting}
            variant="outline"
          >
            <PaperPlaneIcon className="size-4" />
            Send one-time password
          </SubmitButton>
        </form>
      </Form>
    </AppLayout>
  );
}
