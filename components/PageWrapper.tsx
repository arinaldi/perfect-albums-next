import { memo, ReactNode } from 'react';
import Head from 'next/head';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { XIcon } from '@heroicons/react/solid';

import NavBar from 'components/NavBar';

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
      <Toaster
        position="top-center"
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
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                <XIcon
                  className="ml-2 mr-1 h-5 w-5 cursor-pointer"
                  onClick={() => toast.dismiss(t.id)}
                />
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

export default memo(PageWrapper);
