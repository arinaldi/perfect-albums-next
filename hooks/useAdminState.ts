import {
  ChangeEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { PER_PAGE, SORT_DIRECTION } from 'constants/index';
import { fetchAndCache } from 'utils/api';
import { Album } from 'utils/types';
import useDebounce from 'hooks/useDebounce';
import useAdminAlbums from 'hooks/useAdminAlbums';

interface Handlers {
  onClear: () => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPerPageChange: (value: number) => void;
  onPrevious: () => void;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSort: (event: MouseEvent<HTMLElement>) => void;
}

interface Payload {
  albums: Album[];
  currentPage: number;
  direction: string;
  handlers: Handlers;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  perPage: number;
  searchRef: RefObject<HTMLInputElement>;
  searchText: string;
  sort: string;
  total: number;
}

export default function useAdminState(): Payload {
  const router = useRouter();
  const { search } = router.query;
  const [searchText, setSearchText] = useState(
    typeof search === 'string' ? search : '',
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE.twentyFive);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && Boolean(searchText);
  const { albums, total, isLoading } = useAdminAlbums(url, preventFetch);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  useEffect(() => {
    if (!search) {
      const nextUrl = '/api/albums?page=2&per_page=25&search=&sort=&direction=';
      fetchAndCache(nextUrl);
    }
  }, [search]);

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  const handlers = useMemo(
    () => ({
      onPrevious: () => {
        const newPage = currentPage - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) fetchAndCache(previousUrl);
        setCurrentPage(page => page - 1);
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          currentPage + 2
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(nextUrl);
        setCurrentPage(page => page + 1);
      },
      onFirst: () => {
        setCurrentPage(1);
      },
      onLast: () => {
        const page = Math.ceil(total / perPage);
        const prevUrl = `/api/albums?page=${
          page - 1
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(prevUrl);
        setCurrentPage(page);
      },
      onPerPageChange: (value: number) => {
        setPerPage(value);
        setCurrentPage(1);
      },
      onSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCurrentPage(1);
        setSearchText(value);
      },
      onClear: () => {
        setCurrentPage(1);
        setSearchText('');
        searchRef?.current?.focus();

        if (router.query.search) {
          router.replace(router.pathname);
        }
      },
      onSort: (event: MouseEvent<HTMLElement>) => {
        if (!(event.target instanceof HTMLElement)) return;

        const { value } = event.target.dataset;
        const { ASC, DESC } = SORT_DIRECTION;

        setSort(value || '');
        setDirection(direction => {
          if (sort !== value || !direction || direction === DESC) {
            return ASC;
          }

          return DESC;
        });
        setCurrentPage(1);
      },
    }),
    [currentPage, debouncedSearch, direction, perPage, router, sort, total],
  );

  return {
    albums,
    currentPage,
    direction,
    handlers,
    isFirstPage,
    isLastPage,
    isLoading,
    perPage,
    searchRef,
    searchText,
    sort,
    total,
  };
}
