import {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import {
  PER_PAGE,
  ROUTES_ADMIN,
  SORT_DIRECTION,
  SORT_VALUE,
} from 'constants/index';
import {
  parseDirectionQuery,
  parsePageQuery,
  parsePerPageQuery,
  parseQuery,
  parseSortQuery,
} from 'utils';
import { Album } from 'utils/types';
import useDebounce from 'hooks/useDebounce';
import useAdminAlbums from 'hooks/useAdminAlbums';
import usePrefetch from 'hooks/usePrefetch';

interface Handlers {
  onArtistChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPerPageChange: (value: number) => void;
  onPrevious: () => void;
  onSort: (value: SORT_VALUE) => void;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Payload {
  albums: Album[];
  artistSearch: string;
  artistSearchRef: RefObject<HTMLInputElement>;
  cdTotal: number;
  direction: SORT_DIRECTION;
  handlers: Handlers;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  page: number;
  perPage: PER_PAGE;
  sort: SORT_VALUE;
  titleSearch: string;
  titleSearchRef: RefObject<HTMLInputElement>;
  total: number;
}

export default function useAdminState(): Payload {
  const prefetch = usePrefetch();
  const router = useRouter();
  const page = parsePageQuery(router.query.page);
  const perPage = parsePerPageQuery(router.query.perPage);
  const artist = parseQuery(router.query.artist);
  const title = parseQuery(router.query.title);
  const sort = parseSortQuery(router.query.sort);
  const direction = parseDirectionQuery(router.query.direction);
  const [artistSearch, setArtistSearch] = useState(artist);
  const [titleSearch, setTitleSearch] = useState(title);
  const debouncedArtist = useDebounce(artistSearch);
  const debouncedTitle = useDebounce(titleSearch);
  const artistSearchRef = useRef<HTMLInputElement | null>(null);
  const titleSearchRef = useRef<HTMLInputElement | null>(null);
  const url = `/api/albums?page=${page}&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}`;
  const preventFetch =
    (!debouncedArtist && Boolean(artistSearch)) ||
    (!debouncedTitle && Boolean(titleSearch));
  const { albums, cdTotal, total, isLoading } = useAdminAlbums(
    url,
    preventFetch,
  );
  const isFirstPage = page === 1;
  const isLastPage = page === Math.ceil(total / perPage);

  const updateQueryParams = useCallback(
    (query: Record<string, string>) => {
      router.replace({
        pathname: ROUTES_ADMIN.base.href,
        query: {
          ...router.query,
          ...query,
        },
      });
    },
    [router],
  );

  useEffect(() => {
    if (!artist || !title) {
      const nextUrl = `/api/albums?page=2&per_page=${PER_PAGE.SMALL}&artist=&title=&sort=&direction=`;
      prefetch(nextUrl);
    }
  }, [artist, prefetch, title]);

  useEffect(() => {
    artistSearchRef?.current?.focus();
  }, []);

  useEffect(() => {
    const shouldUpdate =
      artistSearch === debouncedArtist && artist !== debouncedArtist;

    if (shouldUpdate) {
      updateQueryParams({ artist: debouncedArtist, page: '1' });
    }
  }, [artist, artistSearch, debouncedArtist, updateQueryParams]);

  useEffect(() => {
    const shouldUpdate =
      titleSearch === debouncedTitle && title !== debouncedTitle;

    if (shouldUpdate) {
      updateQueryParams({ page: '1', title: debouncedTitle });
    }
  }, [debouncedTitle, updateQueryParams, title, titleSearch]);

  const handlers = useMemo(() => {
    return {
      onPrevious: () => {
        const newPage = page - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) prefetch(previousUrl);

        const prevPage = page - 1;
        updateQueryParams({ page: prevPage.toString() });
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          page + 2
        }&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}`;
        prefetch(nextUrl);

        const nextPage = page + 1;
        updateQueryParams({ page: nextPage.toString() });
      },
      onFirst: () => {
        updateQueryParams({ page: '1' });
      },
      onLast: () => {
        const lastPage = Math.ceil(total / perPage);
        const prevUrl = `/api/albums?page=${
          lastPage - 1
        }&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}`;
        prefetch(prevUrl);

        updateQueryParams({ page: lastPage.toString() });
      },
      onPerPageChange: (value: PER_PAGE) => {
        updateQueryParams({ page: '1', perPage: value.toString() });
      },
      onArtistChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setArtistSearch(value);
      },
      onClear: () => {
        artistSearchRef?.current?.focus();

        setArtistSearch('');
        setTitleSearch('');
        updateQueryParams({ artist: '', page: '1', title: '' });
      },
      onSort: (value: SORT_VALUE) => {
        const { ASC, DESC } = SORT_DIRECTION;
        let newDirection = DESC;

        if (sort !== value || !direction || direction === DESC) {
          newDirection = ASC;
        }

        updateQueryParams({ page: '1', sort: value, direction: newDirection });
      },
      onTitleChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setTitleSearch(value);
      },
    };
  }, [
    debouncedArtist,
    debouncedTitle,
    direction,
    page,
    perPage,
    prefetch,
    sort,
    total,
    updateQueryParams,
  ]);

  return {
    albums,
    artistSearch,
    artistSearchRef,
    cdTotal,
    direction,
    handlers,
    isFirstPage,
    isLastPage,
    isLoading,
    page,
    perPage,
    titleSearch,
    titleSearchRef,
    sort,
    total,
  };
}
