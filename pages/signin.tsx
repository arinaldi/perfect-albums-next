import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ROUTES_ADMIN } from 'constants/index';
import { getTitle } from 'utils';
import SignIn from 'components/SignIn';
import useAuthStore from 'hooks/useAuthStore';

const SigninPage: FC = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (user) {
      router.push(ROUTES_ADMIN.base.href);
    } else {
      setShouldRender(true);
    }
  }, [router, user]);

  if (!shouldRender) return null;

  return (
    <>
      <Head>
        <title>{getTitle('Sign In')}</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SigninPage;
