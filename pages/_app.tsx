import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';

import { SWRProvider } from 'hooks/useAuthStore';
import PageWrapper from 'components/PageWrapper';
import 'styles/globals.css';
import 'styles/nprogress.css';

interface Options {
  shallow: boolean;
}

export default function MyApp({ Component, pageProps }: AppProps) {
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
    <SWRProvider>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </SWRProvider>
  );
}
