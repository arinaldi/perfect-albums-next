import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import nProgress from 'nprogress';

import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import SWRProvider from 'components/SWRProvider';
import 'styles/globals.css';
import 'styles/nprogress.css';

interface Options {
  shallow: boolean;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  function onStart(_: string, { shallow }: Options) {
    if (!shallow) {
      nProgress.start();
    }
  }

  function onDone() {
    nProgress.done();
  }

  useEffect(() => {
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onDone);
    router.events.on('routeChangeError', onDone);

    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onDone);
      router.events.off('routeChangeError', onDone);
    };
  }, [router]);

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
