import { FC } from 'react';
import { AppProps } from 'next/app';
import router from 'next/router';
import nProgress from 'nprogress';

import { AuthProvider } from 'hooks/useAuth';
import { Provider } from 'components/Provider';
import PageWrapper from 'components/PageWrapper';
import 'styles/globals.css';
import 'styles/nprogress.css';

router.events.on('routeChangeStart', () => nProgress.start());
router.events.on('routeChangeComplete', () => nProgress.done());
router.events.on('routeChangeError', () => nProgress.done());

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Provider>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
