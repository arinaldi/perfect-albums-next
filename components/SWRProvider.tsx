import { useEffect } from 'react';
import { Fetcher, Key, mutate, SWRConfig } from 'swr';

import useAuthStore, { useUser } from 'hooks/useAuthStore';
import useIsMounted from 'hooks/useIsMounted';
import supabase from 'utils/supabase';
import { Children } from 'utils/types';
import Spinner from 'components/Spinner';

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
  const user = useUser();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (user === undefined && supabase.auth.user() === null) {
      useAuthStore.setState({ user: null });
    }
  }, [user]);

  if (!isMounted() && user === undefined) {
    return (
      <div className="flex min-h-screen justify-center dark:bg-gray-800">
        <Spinner className="mt-8 h-8 w-8 dark:text-white" />
      </div>
    );
  }

  return (
    <SWRConfig value={{ fetcher, use: [trackLiveQueries] }}>
      {children}
    </SWRConfig>
  );
}
