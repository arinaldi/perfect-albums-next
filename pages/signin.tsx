import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';

import { ROUTES_ADMIN } from 'constants/index';
import { loadIdToken } from 'auth/firebaseAdmin';
import FirebaseAuth from 'components/FirebaseAuth';

const SigninPage: FC = () => <FirebaseAuth />;

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
