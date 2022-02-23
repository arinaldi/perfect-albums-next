import Head from 'next/head';

import { getTitle } from 'utils';
import Admin from 'components/Admin';

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>{getTitle('Admin')}</title>
      </Head>
      <Admin />
    </>
  );
}
