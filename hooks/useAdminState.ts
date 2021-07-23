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
import { parseDirectionQuery, parseQuery, parseSortQuery } from 'utils';
import { fetchAndCache } from 'utils/api';
import { Album, GenericObject } from 'utils/types';
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
  currentPage: number;
  direction: SORT_DIRECTION;
  handlers: Handlers;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  perPage: number;
  searchRef: RefObject<HTMLInputElement>;
  searchText: string;
  sort: SORT_VALUE;
  total: number;
}

export default function useAdminState(): Payload {
  const router = useRouter();
  const search = parseQuery(router.query.search);
  const [searchText, setSearchText] = useState(search);
  const [currentPage, setCurrentPage] = useState(
    parseInt(parseQuery(router.query.page)) || 1,
  );
  const [perPage, setPerPage] = useState(
    parseInt(parseQuery(router.query.perPage)) || PER_PAGE.twentyFive,
  );
  const [sort, setSort] = useState(parseSortQuery(router.query.sort));
  const [direction, setDirection] = useState(
    parseDirectionQuery(router.query.direction),
  );
  const debouncedSearch = useDebounce(searchText, 500);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && Boolean(searchText);
  const { albums, cdTotal, total, isLoading } = useAdminAlbums(
    url,
    preventFetch,
  );
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

  const handlers = useMemo(() => {
    function updateQueryParams(query: GenericObject): void {
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
        const newPage = currentPage - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) fetchAndCache(previousUrl);

        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        updateQueryParams({ page: prevPage.toString() });
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          currentPage + 2
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(nextUrl);

        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        updateQueryParams({ page: nextPage.toString() });
      },
      onFirst: () => {
        setCurrentPage(1);
        updateQueryParams({ page: '1' });
      },
      onLast: () => {
        const lastPage = Math.ceil(total / perPage);
        const prevUrl = `/api/albums?page=${
          lastPage - 1
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(prevUrl);

        setCurrentPage(lastPage);
        updateQueryParams({ page: lastPage.toString() });
      },
      onPerPageChange: (value: number) => {
        setPerPage(value);
        setCurrentPage(1);
        updateQueryParams({ page: '1', perPage: value.toString() });
      },
      onSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setCurrentPage(1);
        setSearchText(value);
        updateQueryParams({ page: '1', search: value });
      },
      onClear: () => {
        searchRef?.current?.focus();

        setCurrentPage(1);
        setSearchText('');
        updateQueryParams({ page: '1', search: '' });
      },
      onSort: (value: SORT_VALUE) => {
        const { ASC, DESC } = SORT_DIRECTION;
        let newDirection = DESC;

        if (sort !== value || !direction || direction === DESC) {
          newDirection = ASC;
        }

        setCurrentPage(1);
        setSort(value);
        setDirection(newDirection);
        updateQueryParams({ page: '1', sort: value, direction: newDirection });
      },
    };
  }, [currentPage, debouncedSearch, direction, perPage, router, sort, total]);

  return {
    albums,
    cdTotal,
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
