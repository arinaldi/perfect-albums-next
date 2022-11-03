import { memo } from 'react';
import Head from 'next/head';

import NavBar from 'components/NavBar';
import Toast from 'components/Toast';
import { Children } from 'utils/types';

function PageWrapper({ children }: Children) {
  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Head>
        <title>Perfect Albums</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
      <Toast />
    </div>
  );
}

export default memo(PageWrapper);
