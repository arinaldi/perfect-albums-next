import { memo, ReactNode } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import NavBar from 'components/NavBar';
import ModalContainer from 'components/ModalContainer';

interface Props {
  children: ReactNode;
}

function PageWrapper({ children }: Props) {
  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Head>
        <title>Perfect Albums</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (window !== undefined) {
              if (window.localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
          `,
          }}
        />
      </Head>
      <NavBar />
      {children}
      <ModalContainer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: '#A7F3D0',
              borderLeft: '4px solid #059669',
            },
          },
          error: {
            style: {
              background: '#FECACA',
              borderLeft: '4px solid #DC2626',
            },
          },
        }}
      />
    </div>
  );
}

export default memo(PageWrapper);
