import { useEffect } from 'react';
import { useFormState } from 'react-dom';
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
import PasswordInput from '@/components/PasswordInput';
import SubmitButton from '@/components/SubmitButton';
import { signIn } from './actions';
import { initialState, SignInInput, signInSchema } from './schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function PasswordForm({ email, onCancel }: Props) {
  const [state, formAction] = useFormState(signIn, initialState);
  const form = useForm<SignInInput>({
    defaultValues: {
      email,
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.message) {
      toast.error(state.message.split('-')[0].trim());
    }
  }, [state.message]);

  async function action(formData: FormData) {
    const valid = await form.trigger();

    if (!valid) return;

    formAction(formData);
  }

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <Form {...form}>
        <form action={action}>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input className="hidden" id="name" name="name" tabIndex={-1} />
          <SubmitButton className="mt-6 w-full" />
        </form>
      </Form>
      <Button className="mt-2 w-full" onClick={onCancel} variant="outline">
        Cancel
      </Button>
    </AppLayout>
  );
}
