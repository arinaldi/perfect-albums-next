import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import useForm from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import { SignInInput } from 'utils/types';
import Layout from 'components/Layout';
import Input from 'components/Input';
import SubmitButton from 'components/SubmitButton';

const SignIn: FC = () => {
  const router = useRouter();
  const auth = getAuth();
  const { values, handleChange, resetForm } = useForm<SignInInput>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const options = {
    callbacks: [() => router.push('/new-releases')],
    submitFn: async () => {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    },
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <Layout maxWidth="max-w-sm" title="Sign In">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <div className="mb-4">
                <Input
                  id="email"
                  onChange={handleChange}
                  required
                  type="email"
                  value={values.email}
                />
              </div>
              <div className="mb-4">
                <Input
                  id="password"
                  onChange={handleChange}
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
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
