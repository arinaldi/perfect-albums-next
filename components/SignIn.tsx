import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { ROUTE_HREF } from 'constants/index';
import useAuthStore from 'hooks/useAuthStore';
import useSubmit from 'hooks/useSubmit';
import { SignInInput } from 'utils/types';
import Layout from 'components/Layout';
import Input from 'components/Input';
import SubmitButton from 'components/SubmitButton';

export default function SignIn() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const { handleSubmit, register } = useForm<SignInInput>();
  const [showPassword, setShowPassword] = useState(false);

  const options = {
    callbacks: [() => router.push(ROUTE_HREF.NEW_RELEASES)],
    handleSubmit,
    submitFn: async (data: SignInInput) => {
      const { error } = await signIn(data.email, data.password);

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
                <Input
                  id="password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="text-gray-500 background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 hover:bg-gray-200"
            onClick={() => setShowPassword((show) => !show)}
            type="button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <SubmitButton
            isSubmitting={isSubmitting}
            label="Submit"
            loadingLabel="Submitting..."
          />
        </div>
      </form>
    </Layout>
  );
}
