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
    <div className="h-full dark:bg-gray-800">
      <Head>
        <title>Perfect Albums</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if (localStorage.theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          `,
        }}
        />
      </Head>
      <NavBar />
      {children}
      <ModalContainer />
      <Toast />
    </div>
  );
};

export default PageWrapper;
