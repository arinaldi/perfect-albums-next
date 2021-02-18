import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../components/Provider';
import api from '../utils/api';
import { isTokenValid } from '../utils/auth';
import { DISPATCH_TYPES } from '../constants';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function handleChange(event) {
    const { name, value } = event.target;

    if (error) setError('');

    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await api('/api/signin', { body: values });
      setIsSubmitting(false);
      dispatch({
        payload: data.token,
        type: DISPATCH_TYPES.SIGN_IN_USER,
      });
      router.push('/admin');
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Sign In</h1>
      </div>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="username"
                onChange={handleChange}
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
                onChange={handleChange}
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
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const isValid = await isTokenValid(req);

  if (isValid) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
