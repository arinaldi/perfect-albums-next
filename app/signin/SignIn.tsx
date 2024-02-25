'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import AppLayout from 'components/AppLayout';
import { useToast } from 'components/Toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';
import { initialState } from './schema';
import { signIn } from './actions';

export default function SignIn() {
  const [state, formAction] = useFormState(signIn, initialState);
  const { showToast } = useToast();

  useEffect(() => {
    if (state.message) {
      showToast(state.message);
    }
    // state.message will not trigger effect if same value
  }, [showToast, state]);

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <form action={formAction} className="mt-4 flex flex-col gap-4">
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Password</Label>
          <Input
            autoComplete="off"
            id="password"
            name="password"
            required
            type="password"
          />
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
