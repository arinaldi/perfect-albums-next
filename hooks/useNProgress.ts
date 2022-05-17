import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';

interface Options {
  shallow: boolean;
}

export default function useNProgress() {
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
}
