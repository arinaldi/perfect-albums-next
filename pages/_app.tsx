import { AppProps } from 'next/app';
import Script from 'next/script';

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
      <Script
        id="dark-mode"
        dangerouslySetInnerHTML={{
          __html: `
            const root = window.document.documentElement;
            const prefersDark = !('theme' in localStorage) &&
              window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (localStorage.theme === 'dark' || prefersDark) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
          `,
        }}
      />
      <SWRProvider>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </SWRProvider>
    </ErrorBoundary>
  );
}
