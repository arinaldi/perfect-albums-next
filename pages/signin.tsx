import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ROUTES_ADMIN } from 'constants/index';
import { getTitle } from 'utils';
import supabase from 'utils/supabase';
import SignIn from 'components/SignIn';

const SigninPage: FC = () => (
  <>
    <Head>
      <title>{getTitle('Sign In')}</title>
    </Head>
    <SignIn />
  </>
);

export default SigninPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: ROUTES_ADMIN.base.href,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
