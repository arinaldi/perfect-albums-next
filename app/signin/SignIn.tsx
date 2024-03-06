'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from 'components/AppLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/PasswordInput';
import SubmitButton from 'components/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from './actions';
import { initialState, signInSchema, type SignInInput } from './schema';

export default function SignIn() {
  const [state, formAction] = useFormState(signIn, initialState);
  const { toast } = useToast();
  const form = useForm<SignInInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (!state.message) return;

    toast({
      description: state.message.split('-')[0].trim(),
      title: 'Error',
      variant: 'destructive',
    });
  }, [state.message, toast]);

  async function action(formData: FormData) {
    const valid = await form.trigger();

    if (!valid) return;

    formAction(formData);
  }

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <Form {...form}>
        <form action={action} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoFocus type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton className="w-full sm:w-auto" />
        </form>
      </Form>
    </AppLayout>
  );
}
