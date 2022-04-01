import { useEffect } from 'react';
import { Fetcher, Key, mutate, SWRConfig } from 'swr';

import { Children } from 'utils/types';

export async function fetcher(url: string): Promise<any> {
  return window
    .fetch(url, { headers: { 'Content-Type': 'application/json' } })
    .then((res) => res.json());
}

const liveQueries = new Set();

export async function revalidateLiveQueries() {
  const promises = [...liveQueries.values()].map((key) => mutate(key as Key));

  return Promise.all(promises);
}

function trackLiveQueries(useSWRNext: any) {
  return (key: Key, fetcher: Fetcher<any> | null, config: any) => {
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      liveQueries.add(key);

      return () => {
        liveQueries.delete(key);
      };
    }, [key]);

    return swr;
  };
}

export default function SWRProvider({ children }: Children) {
  return (
    <SWRConfig value={{ fetcher, use: [trackLiveQueries] }}>
      {children}
    </SWRConfig>
  );
}
