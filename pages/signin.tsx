import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';

import { ROUTES_ADMIN } from 'constants/index';
import { loadIdToken } from 'auth/firebaseAdmin';
import { getTitle } from 'utils';
import FirebaseAuth from 'components/FirebaseAuth';

const SigninPage: FC = () => (
  <>
    <Head>
      <title>{getTitle('Sign In')}</title>
    </Head>
    <FirebaseAuth />
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
