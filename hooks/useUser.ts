import useSWR from 'swr';

import { fetcher } from 'utils/api';

interface Payload {
  hasAuth: boolean;
  mutate: (data?: string, shouldRevalidate?: boolean) => void;
}

const FIVE_MIN_IN_MS = 1000 * 60 * 10;

export default function useUser(): Payload {
  const { data, error, mutate } = useSWR('/api/auth', fetcher, {
    dedupingInterval: FIVE_MIN_IN_MS,
    shouldRetryOnError: false,
  });
  const hasAuth = data === 'User is valid' && error?.status !== 401;

  return { hasAuth, mutate };
}
