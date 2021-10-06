import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import useSubmit from 'hooks/useSubmit';
import { SignInInput } from 'utils/types';
import Layout from 'components/Layout';
import Input from 'components/Input';
import SubmitButton from 'components/SubmitButton';

const SignIn: FC = () => {
  const router = useRouter();
  const auth = getAuth();
  const { handleSubmit, register } = useForm<SignInInput>();
  const [showPassword, setShowPassword] = useState(false);
  const { ref: emailRef, ...emailRest } = register('email', { required: true });
  const { ref: passwordRef, ...passwordRest } = register('password', {
    required: true,
  });

  const options = {
    callbacks: [() => router.push('/new-releases')],
    handleSubmit,
    submitFn: async (data: SignInInput) => {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
                  inputRef={emailRef}
                  required
                  type="email"
                  {...emailRest}
                />
              </div>
              <div className="mb-4">
                <Input
                  id="password"
                  inputRef={passwordRef}
                  required
                  type={showPassword ? 'text' : 'password'}
                  {...passwordRest}
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
};

export default SignIn;
