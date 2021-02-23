import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { ICONS, PER_PAGE, SORT_DIRECTION } from 'constants/index';
import { getSortIcon } from 'utils';
import { fetchAndCache } from 'utils/api';
import { isTokenValid } from 'utils/auth';
import useAdminAlbums from 'hooks/useAdminAlbums';
import useDebounce from 'hooks/useDebounce';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';

export default function Admin() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE[0]);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  const searchRef = useRef(null);
  const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = false; // !debouncedSearch && searchText;
  const { albums, total, isLoading } = useAdminAlbums(url, preventFetch);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  useEffect(() => {
    if (!router.query.search) {
      const nextUrl = '/api/albums?page=2&per_page=25&search=&sort=&direction=';
      fetchAndCache(nextUrl);
    }
  }, [router.query.search]);

  useEffect(() => {
    searchRef.current.focus();
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

  function handlePerPageChange(value) {
    setPerPage(value);
    handleFirst();
  }

  function handleSearchChange(event) {
    const { value } = event.target;
    handleFirst();
    setSearchText(value);
  }

  function handleClear() {
    handleFirst();
    setSearchText('');
    searchRef.current.focus();

    if (router.query.search) {
      router.replace(router.pathname);
    }
  }

  function handleSort(event) {
    const { value } = event.target.dataset;
    const { ASC, DESC } = SORT_DIRECTION;

    setSort(value);
    setDirection(direction => {
      if (sort !== value || !direction || direction === DESC) {
        return ASC;
      }

      return DESC;
    });
    handleFirst();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Admin</h1>
        <div className="ml-3 p-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold">
          {total.toLocaleString()}
        </div>
      </div>

      <div className="block sm:flex sm:justify-between sm:items-center mb-4">
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          id="search"
          name="search"
          onChange={handleSearchChange}
          placeholder="Search"
          ref={searchRef}
          type="text"
          value={searchText}
        />
        <div className="block mt-2 sm:flex sm:mt-0 sm:ml-4">
          <button
            className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="ml-1 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
            onClick={() => {
              router.push('/admin/create');
            }}
          >
            New
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Pagination
          onFirst={handleFirst}
          onLast={handleLast}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentPage={currentPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
        <div className="mx-2" />
        <PerPage
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
        />
      </div>

      {albums.length === 0 && !isLoading
        ? <p className="text-center mt-8 text-2xl">No results found</p>
        : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer"
                          data-value="artist"
                          onClick={handleSort}
                          scope="col"
                        >
                          {sort === 'artist' && getSortIcon(direction)}
                          Artist
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer"
                          data-value="title"
                          onClick={handleSort}
                          scope="col"
                        >
                          {sort === 'title' && getSortIcon(direction)}
                          Title
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer"
                          data-value="year"
                          onClick={handleSort}
                          scope="col"
                        >
                          {sort === 'year' && getSortIcon(direction)}
                          Year
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          CD
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          AotD
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          Favorite
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {albums.map(album => (
                        <tr key={album.id} className="odd:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {album.artist}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {album.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {album.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {album.cd && ICONS.CHECK}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {album.aotd && ICONS.CHECK}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {album.favorite && ICONS.CHECK}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Edit | Delete
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}

export async function getServerSideProps({ req }) {
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
}
