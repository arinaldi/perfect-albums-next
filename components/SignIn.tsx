import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { ROUTE_HREF } from 'constants/index';
import useSubmit from 'hooks/useSubmit';
import supabase from 'utils/supabase';
import { SignInInput } from 'utils/types';
import Layout from 'components/Layout';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';
import SubmitButton from 'components/SubmitButton';

export default function SignIn() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<SignInInput>();

  const options = {
    callbacks: [() => router.push(ROUTE_HREF.NEW_RELEASES)],
    handleSubmit,
    submitFn: async (data: SignInInput) => {
      const { error } = await supabase.auth.signIn(data);

      if (error) throw error;
    },
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Layout maxWidth="max-w-sm" title="Sign In">
      <form method="POST" onSubmit={onSubmit}>
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
                <PasswordInput {...register('password', { required: true })} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <SubmitButton isSubmitting={isSubmitting} />
        </div>
      </form>
    </Layout>
  );
}
