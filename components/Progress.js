import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';

export default function Progress() {
  const router = useRouter();

  useEffect(() => {
    let timeout;

    function start() {
      timeout = setTimeout(nProgress.start, 100);
    }

    function done() {
      clearTimeout(timeout);
      nProgress.done();
    }

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, []);

  return <></>;
}
