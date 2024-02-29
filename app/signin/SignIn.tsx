'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import AppLayout from 'components/AppLayout';
import { useToast } from 'components/ui/use-toast';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import SubmitButton from 'components/SubmitButton';
import { signIn } from './actions';
import { initialState } from './schema';

export default function SignIn() {
  const [state, formAction] = useFormState(signIn, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
        title: 'Error',
        variant: 'destructive',
      });
    }
    // state.message will not trigger effect if same value
  }, [state, toast]);

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <form action={formAction} className="mt-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            autoFocus
            id="email"
            name="email"
            required
            type="email"
          />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Password</Label>
          <Input
            autoComplete="off"
            id="password"
            name="password"
            required
            type="password"
          />
        </div>
        <SubmitButton className="mt-6 w-full sm:w-auto" />
      </form>
    </AppLayout>
  );
}
