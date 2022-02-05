import { Suspense, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';

import useIsMounted from 'hooks/useIsMounted';
import PageWrapper from 'components/PageWrapper';
import Spinner from 'components/Spinner';
import SWRProvider from 'components/SWRProvider';
import 'styles/globals.css';
import 'styles/nprogress.css';

interface Options {
  shallow: boolean;
}

export default function Wrapper(props: any) {
  const isMounted = useIsMounted();

  return isMounted ? <App {...props} /> : null;
}

function App({ Component, pageProps }: AppProps) {
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
        <Suspense fallback={<Spinner />}>
          <Component {...pageProps} />
        </Suspense>
      </PageWrapper>
    </SWRProvider>
  );
}
