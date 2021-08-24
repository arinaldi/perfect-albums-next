import {
  ChangeEvent,
  RefObject,
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
  onSort: (value: SORT_VALUE) => void;
}

interface Payload {
  albums: Album[];
  cdTotal: number;
  direction: SORT_DIRECTION;
  handlers: Handlers;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  page: number;
  perPage: PER_PAGE;
  searchRef: RefObject<HTMLInputElement>;
  searchText: string;
  sort: SORT_VALUE;
  total: number;
}

export default function useAdminState(): Payload {
  const router = useRouter();
  const direction = parseDirectionQuery(router.query.direction);
  const page = parsePageQuery(router.query.page);
  const perPage = parsePerPageQuery(router.query.perPage);
  const search = parseQuery(router.query.search);
  const sort = parseSortQuery(router.query.sort);
  const [searchText, setSearchText] = useState(search);
  const debouncedSearch = useDebounce(searchText, 500);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const url = `/api/albums?page=${page}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && Boolean(searchText);
  const { albums, cdTotal, total, isLoading } = useAdminAlbums(
    url,
    preventFetch,
  );
  const isFirstPage = page === 1;
  const isLastPage = page === Math.ceil(total / perPage);

  useEffect(() => {
    if (!search) {
      const nextUrl = `/api/albums?page=2&per_page=${PER_PAGE.SMALL}&search=&sort=&direction=`;
      fetchAndCache(nextUrl);
    }
  }, [search]);

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  const handlers = useMemo(() => {
    function updateQueryParams(query: Record<string, string>): void {
      router.replace({
        pathname: ROUTES_ADMIN.base.href,
        query: {
          ...router.query,
          ...query,
        },
      });
    }

    return {
      onPrevious: () => {
        const newPage = page - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) fetchAndCache(previousUrl);

        const prevPage = page - 1;
        updateQueryParams({ page: prevPage.toString() });
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          page + 2
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(nextUrl);

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
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(prevUrl);

        updateQueryParams({ page: lastPage.toString() });
      },
      onPerPageChange: (value: PER_PAGE) => {
        updateQueryParams({ page: '1', perPage: value.toString() });
      },
      onSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchText(value);
        updateQueryParams({ page: '1', search: value });
      },
      onClear: () => {
        searchRef?.current?.focus();

        setSearchText('');
        updateQueryParams({ page: '1', search: '' });
      },
      onSort: (value: SORT_VALUE) => {
        const { ASC, DESC } = SORT_DIRECTION;
        let newDirection = DESC;

        if (sort !== value || !direction || direction === DESC) {
          newDirection = ASC;
        }

        updateQueryParams({ page: '1', sort: value, direction: newDirection });
      },
    };
  }, [debouncedSearch, direction, page, perPage, router, sort, total]);

  return {
    albums,
    cdTotal,
    direction,
    handlers,
    isFirstPage,
    isLastPage,
    isLoading,
    page,
    perPage,
    searchRef,
    searchText,
    sort,
    total,
  };
}
