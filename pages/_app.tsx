import { AppProps } from 'next/app';

import useNProgress from 'hooks/useNProgress';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import SWRProvider from 'components/SWRProvider';
import 'styles/globals.css';
import 'styles/nprogress.css';

export default function App({ Component, pageProps }: AppProps) {
  useNProgress();

  return (
    <ErrorBoundary>
      <SWRProvider>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </SWRProvider>
    </ErrorBoundary>
  );
}
