'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-hot-toast';

import AppLayout from 'components/AppLayout';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';
import SubmitButton from 'app/admin/SubmitButton';
import { signIn } from './actions';
import { initialState } from './schema';

export default function SignIn() {
  const [state, formAction] = useFormState(signIn, initialState);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
    // state.message will not trigger effect if same value
  }, [state]);

  return (
    <AppLayout className="max-w-sm" title="Sign In">
      <form action={formAction}>
        <fieldset>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Input
                id="email"
                name="email"
                required
                type="email"
                wrapperClassName="mt-4"
              />
              <PasswordInput wrapperClassName="mt-4" />
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <SubmitButton />
          </div>
        </fieldset>
      </form>
    </AppLayout>
  );
}
