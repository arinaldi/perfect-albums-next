import { memo, ReactNode } from 'react';
import Head from 'next/head';

import NavBar from 'components/NavBar';
import Toast from 'components/Toast';

interface Props {
  children: ReactNode;
}

function PageWrapper({ children }: Props) {
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
