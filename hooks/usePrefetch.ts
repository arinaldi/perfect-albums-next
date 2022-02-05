import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

import { fetcher } from 'components/SWRProvider';

type Prefetch = (key: string) => void;

export default function usePrefetch(): Prefetch {
  const { mutate } = useSWRConfig();
  const prefetch = useCallback(
    (key: string) => {
      const request = fetcher(key);
      mutate(key, request, false);
    },
    [mutate],
  );

  return prefetch;
}
