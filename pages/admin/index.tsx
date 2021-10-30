import { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  PER_PAGE,
  ROUTES_ADMIN,
  SORT_DIRECTION,
  SORT_VALUE,
} from 'constants/index';
import { getTitle, isEmptyObject } from 'utils';
import Admin from 'components/Admin';

const AdminPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (isEmptyObject(router.query)) {
      router.replace({
        pathname: ROUTES_ADMIN.base.href,
        query: {
          page: 1,
          perPage: PER_PAGE.SMALL,
          artist: '',
          title: '',
          sort: SORT_VALUE.NONE,
          direction: SORT_DIRECTION.NONE,
          studio: '',
        },
      });
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{getTitle('Admin')}</title>
      </Head>
      <Admin />
    </>
  );
};

export default AdminPage;
