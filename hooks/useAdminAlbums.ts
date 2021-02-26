import useSWR from 'swr';

import { fetcher } from 'utils/api';

export interface Album {
  aotd: boolean;
  artist: string;
  cd: boolean;
  favorite: boolean;
  id: string;
  title: string;
  updatedAt: string;
  year: string;
}

interface Payload {
  albums: Album[];
  total: number;
  hasError: boolean;
  isLoading: boolean;
  mutate: () => void;
}

export default function useAdminAlbums(url: string, preventFetch = false): Payload {
  const key = preventFetch ? null : url;
  const { data, error, mutate } = useSWR(key, fetcher, { dedupingInterval: 10000 });

  const payload = {
    albums: [],
    total: 0,
    hasError: Boolean(error),
    isLoading: !error && !data,
    mutate,
  };

  if (data && !error) {
    payload.albums = data.data;
    payload.total = data.count;
  }

  return payload;
}
