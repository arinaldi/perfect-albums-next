import { ChangeEvent, FC, FormEvent } from 'react';

import Layout from 'components/Layout';

interface Props {
  error: string;
  isSubmitting: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
  values: any;
}

const Signin: FC<Props> = ({ error, isSubmitting, onChange, onSubmit, values }) => {
  return (
    <Layout title="Sign In">
      <div className="max-w-xl mx-auto">
        <form onSubmit={onSubmit} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                autoCapitalize="off"
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="username"
                onChange={onChange}
                name="username"
                placeholder="Username"
                required
                type="text"
                value={values.username}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="password"
                name="password"
                onChange={onChange}
                placeholder="Password"
                required
                type="password"
                value={values.password}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className="group w-full py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {`Submit${isSubmitting ? 'ting...' : ''}`}
            </button>
          </div>
          {error && <p className="text-center text-red-700 mt-2">{error}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
