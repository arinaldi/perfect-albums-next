import { FC, useEffect } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';

import {
  PER_PAGE,
  ROUTES_ADMIN,
  SORT_DIRECTION,
  SORT_VALUE,
} from 'constants/index';
import { loadIdToken } from 'auth/firebaseAdmin';
import Admin from 'components/Admin';
import { isEmptyObject } from 'utils';

const AdminPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (isEmptyObject(router.query)) {
      router.replace({
        pathname: ROUTES_ADMIN.base.href,
        query: {
          direction: SORT_DIRECTION.NONE,
          page: 1,
          perPage: PER_PAGE.SMALL,
          search: '',
          sort: SORT_VALUE.NONE,
        },
      });
    }
  }, [router]);

  return <Admin />;
};

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
