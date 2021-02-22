import useSWR from 'swr';

import { fetcher } from 'utils/api';

export default function useAdminAlbums(url, preventFetch) {
  const key = preventFetch ? null : url;
  const { data, error } = useSWR(key, fetcher, { dedupingInterval: 10000 });

  const payload = {
    albums: [],
    total: 0,
    hasError: Boolean(error),
    isLoading: !error && !data,
  };

  if (data && !error) {
    payload.albums = data.data;
    payload.total = data.count;
  }

  return payload;
}
