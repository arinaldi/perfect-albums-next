import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { PER_PAGE, SORT_DIRECTION } from 'constants/index';
import { fetchAndCache } from 'utils/api';
import { isTokenValid } from 'utils/auth';
import useDebounce from 'hooks/useDebounce';
import useAdminAlbums from 'hooks/useAdminAlbums';
import Admin from 'components/Admin';

const AdminPage: FC = () => {
  const router = useRouter();
  const { search } = router.query;
  const [searchText, setSearchText] = useState(typeof search === 'string' ? search : '');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE[0]);
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

  function handlePrevious() {
    const previousUrl = `/api/albums?page=${currentPage - 2}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
    fetchAndCache(previousUrl);
    setCurrentPage(page => page - 1);
  }

  function handleNext() {
    const nextUrl = `/api/albums?page=${currentPage + 2}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
    fetchAndCache(nextUrl);
    setCurrentPage(page => page + 1);
  }

  function handleFirst() {
    setCurrentPage(1);
  };

  function handleLast() {
    const page = Math.ceil(total / perPage);
    const prevUrl = `/api/albums?page=${page - 1}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
    fetchAndCache(prevUrl);
    setCurrentPage(page);
  };

  function handlePerPageChange(value: number) {
    setPerPage(value);
    handleFirst();
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    handleFirst();
    setSearchText(value);
  }

  function handleClear() {
    handleFirst();
    setSearchText('');
    searchRef?.current?.focus();

    if (router.query.search) {
      router.replace(router.pathname);
    }
  }

  function handleSort(event: MouseEvent<HTMLElement>) {
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
    handleFirst();
  }

  return (
    <Admin
      albums={albums}
      currentPage={currentPage}
      direction={direction}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      isLoading={isLoading}
      onClear={handleClear}
      onFirst={handleFirst}
      onLast={handleLast}
      onNext={handleNext}
      onPerPageChange={handlePerPageChange}
      onPrevious={handlePrevious}
      onSearchChange={handleSearchChange}
      onSort={handleSort}
      perPage={perPage}
      searchRef={searchRef}
      searchText={searchText}
      sort={sort}
      total={total}
    />
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isValid = await isTokenValid(req);

  if (!isValid) {
    return {
      redirect: {
        destination: '/top-albums',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
