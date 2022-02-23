import useSWR from 'swr';

import { Album } from 'utils/types';

interface Payload {
  albums: Album[];
  cdTotal: number;
  total: number;
  hasError: boolean;
  isLoading: boolean;
  mutate: () => void;
}

export default function useAdminAlbums(
  url: string,
  preventFetch = false,
): Payload {
  const key = preventFetch ? null : url;
  const { data, error, mutate } = useSWR(key, { dedupingInterval: 5000 });
  const { data: cdData, error: cdError } = useSWR('/api/cds');

  const payload = {
    albums: [],
    cdTotal: 0,
    total: 0,
    hasError: Boolean(error),
    isLoading: !error && !data,
    mutate,
  };

  if (data && !error) {
    payload.albums = data.albums;
    payload.total = data.count;
  }

  if (cdData && !cdError) {
    payload.cdTotal = cdData.count;
  }

  return payload;
}
