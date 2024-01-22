'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import AppLayout from 'components/AppLayout';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';
import { useToast } from 'components/Toast';
import SubmitButton from 'app/admin/SubmitButton';
import { signIn } from './actions';
import { initialState } from './schema';

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
        <Input id="email" name="email" required type="email" />
        <PasswordInput />
        <Input id="name" name="name" tabIndex={-1} wrapperClassName="hidden" />
        <div className="mt-2 flex items-center">
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
