import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';

import { loadIdToken } from 'auth/firebaseAdmin';
import Admin from 'components/Admin';

const AdminPage: FC = () => <Admin />;

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    return {
      redirect: {
        destination: '/top-albums',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
