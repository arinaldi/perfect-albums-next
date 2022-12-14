'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import nProgress from 'nprogress';

import usePrevious from 'hooks/usePrevious';

export default function useNProgress() {
  const pathname = usePathname();
  const previousPathname = usePrevious(pathname);

  useEffect(() => {
    if (previousPathname && pathname !== previousPathname) {
      nProgress.start();
      nProgress.done();
    }
  }, [pathname, previousPathname]);
}
