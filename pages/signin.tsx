import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { DISPATCH_TYPES, ROUTES_ADMIN } from 'constants/index';
import api from 'utils/api';
import { isTokenValid } from 'utils/auth';
import { useAppDispatch } from 'components/Provider';
import Signin from 'components/Signin';

const SigninPage: FC = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (error) setError('');

    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await api('/api/signin', { body: values });
      setIsSubmitting(false);
      dispatch({
        payload: data.token,
        type: DISPATCH_TYPES.SIGN_IN_USER,
      });
      router.push(ROUTES_ADMIN.base.href);
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
};

export default SigninPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isValid = await isTokenValid(req);

  if (isValid) {
    return {
      redirect: {
        destination: ROUTES_ADMIN.base.href,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
