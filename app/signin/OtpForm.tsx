import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import SubmitButton from '@/components/SubmitButton';
import { useMediaQuery } from '@/hooks/media-query';
import { verifyOtp } from './actions';
import { initialState, verifyOtpSchema } from './schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function OtpForm({ email, onCancel }: Props) {
  const [state, formAction, pending] = useActionState(verifyOtp, initialState);
  const isDesktop = useMediaQuery();
  const form = useForm({
    defaultValues: {
      code: '',
      email,
    },
    resolver: zodResolver(verifyOtpSchema),
  });

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state]);

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <Form {...form}>
        <form action={formAction}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-time password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    render={({ slots }) => (
                      <>
                        <InputOTPGroup>
                          {slots.slice(0, 3).map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} />
                          ))}{' '}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          {slots.slice(3).map((slot, index) => (
                            <InputOTPSlot key={index + 3} {...slot} />
                          ))}
                        </InputOTPGroup>
                      </>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input className="hidden" id="name" name="name" tabIndex={-1} />
          <SubmitButton className="mt-6 w-full" submitting={pending}>
            Submit
          </SubmitButton>
        </form>
      </Form>
      <Button
        className="mt-2 w-full"
        onClick={onCancel}
        size={isDesktop ? 'default' : 'lg'}
        variant="outline"
      >
        Cancel
      </Button>
    </AppLayout>
  );
}
