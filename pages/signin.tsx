import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';

import { ROUTES_ADMIN } from 'constants/index';
import { loadIdToken } from 'auth/firebaseAdmin';
import { getTitle } from 'utils';
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
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    return {
      redirect: {
        destination: ROUTES_ADMIN.base.href,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
