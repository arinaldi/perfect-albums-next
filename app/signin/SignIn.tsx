'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ROUTES_ADMIN } from 'utils/constants';
import useSubmit from 'hooks/useSubmit';
import { createClient } from 'utils/supabase-browser';
import { SignInInput } from 'utils/types';
import AppLayout from 'components/AppLayout';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';
import SubmitButton from 'components/SubmitButton';

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
    <AppLayout maxWidth="max-w-sm" title="Sign In">
      <form method="POST" onSubmit={onSubmit}>
        <fieldset>
          <div className="bg-white dark:bg-gray-800">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <div className="mb-4">
                  <Input
                    id="email"
                    required
                    type="email"
                    {...register('email', { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <PasswordInput
                    {...register('password', { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </fieldset>
      </form>
    </AppLayout>
  );
}
