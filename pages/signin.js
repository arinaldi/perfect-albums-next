import { useState } from 'react';
import { useRouter } from 'next/router';

import { DISPATCH_TYPES } from 'constants/index';
import api from 'utils/api';
import { isTokenValid } from 'utils/auth';
import { useAppDispatch } from 'components/Provider';
import Signin from 'components/Signin';

export default function SigninPage() {
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
    <Signin
      error={error}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={values}
    />
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
