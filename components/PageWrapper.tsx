import { FC, ReactNode } from 'react';
import Head from 'next/head';

import NavBar from 'components/NavBar';
import ModalContainer from 'components/ModalContainer';
import Toast from 'components/Toast';

interface Props {
  children: ReactNode;
}

const PageWrapper: FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Perfect Albums</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
      <ModalContainer />
      <Toast />
    </div>
  );
};

export default PageWrapper;