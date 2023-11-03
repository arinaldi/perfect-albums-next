'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ROUTES_ADMIN } from 'utils/constants';
import useSubmit from 'hooks/useSubmit';
import { createClient } from 'utils/supabase-browser';
import AppLayout from 'components/AppLayout';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';
import PrimaryButton from 'components/PrimaryButton';

interface SignInInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const supabase = createClient();
  const { handleSubmit, register } = useForm<SignInInput>();

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => router.push(ROUTES_ADMIN.base.href)],
    handleSubmit,
    submitFn: async (data: SignInInput) => {
      const { error } = await supabase.auth.signInWithPassword(data);

      if (error) throw error;

      router.refresh();
    },
  });

  return (
    <AppLayout className="max-w-sm" title="Sign In">
      <form method="POST" onSubmit={onSubmit}>
        <fieldset>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Input
                id="email"
                required
                type="email"
                wrapperClassName="mt-4"
                {...register('email')}
              />
              <PasswordInput
                wrapperClassName="mt-4"
                {...register('password')}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <PrimaryButton isSubmitting={isSubmitting} />
          </div>
        </fieldset>
      </form>
    </AppLayout>
  );
}
