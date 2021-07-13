import { FC } from 'react';
import { useRouter } from 'next/router';

import { ICONS, ROUTES_ADMIN } from 'constants/index';
import { getSortIcon } from 'utils';
import useAdminState from 'hooks/useAdminState';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';
import TableSkeleton from 'components/TableSkeleton';
import AppMessage from 'components/AppMessage';
import Button from 'components/Button';
import TableButton from 'components/TableButton';

const Admin: FC = () => {
  const router = useRouter();
  const {
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
  } = useAdminState();
  const {
    onClear,
    onFirst,
    onLast,
    onNext,
    onPerPageChange,
    onPrevious,
    onSearchChange,
    onSort,
  } = handlers;

  function handleRouteChange(pathname: string) {
    router.push({
      pathname,
      query: { search: searchText },
    });
  }

  const Title = (
    <>
      Admin
      <span className="ml-3 p-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold dark:bg-gray-700">
        {isLoading ? '—' : total.toLocaleString()}
      </span>
    </>
  );

  const AppVersion = (
    <code className="dark:text-white">
      {process.env.NEXT_PUBLIC_APP_VERSION}
    </code>
  );

  return (
    <Layout title={Title} titleAction={AppVersion}>
      <div className="block sm:flex sm:justify-between sm:items-center mb-4">
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
          id="search"
          name="search"
          onChange={onSearchChange}
          placeholder="Search"
          ref={searchRef}
          type="text"
          value={searchText}
        />
        <div className="block mt-2 sm:flex sm:mt-0 sm:ml-4">
          <Button onClick={onClear}>Clear</Button>
          <span className="ml-1" />
          <Button onClick={() => handleRouteChange(ROUTES_ADMIN.create.href)}>
            New
          </Button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Pagination
          currentPage={currentPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          onFirst={onFirst}
          onLast={onLast}
          onNext={onNext}
          onPrevious={onPrevious}
        />
        <div className="mx-2" />
        <PerPage onPerPageChange={onPerPageChange} perPage={perPage} />
      </div>

      {albums.length === 0 && !isLoading ? (
        <AppMessage message="No results found" />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg dark:border-black">
                <table className="min-w-full divide-y divide-gray-200 table-auto sm:table-fixed dark:divide-black">
                  <thead>
                    <tr>
                      <th
                        className="sm:w-1/4 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer dark:text-white"
                        data-value="artist"
                        onClick={onSort}
                        scope="col"
                      >
                        {sort === 'artist' && getSortIcon(direction)}
                        Artist
                      </th>
                      <th
                        className="sm:w-1/4 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer dark:text-white"
                        data-value="title"
                        onClick={onSort}
                        scope="col"
                      >
                        {sort === 'title' && getSortIcon(direction)}
                        Title
                      </th>
                      <th
                        className="sm:w-1/12 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer dark:text-white"
                        data-value="year"
                        onClick={onSort}
                        scope="col"
                      >
                        {sort === 'year' && getSortIcon(direction)}
                        Year
                      </th>
                      <th
                        className="sm:w-1/12 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider dark:text-white"
                        scope="col"
                      >
                        CD
                      </th>
                      <th
                        className="sm:w-1/12 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider dark:text-white"
                        scope="col"
                      >
                        AotD
                      </th>
                      <th
                        className="sm:w-1/12 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider dark:text-white"
                        scope="col"
                      >
                        Favorite
                      </th>
                      <th
                        className="sm:w-auto px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider dark:text-white"
                        scope="col"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-500 dark:divide-black">
                      {albums.map(album => (
                        <tr
                          key={album.id}
                          className="odd:bg-gray-50 dark:odd:bg-gray-400"
                        >
                          <td className="sm:max-w-0 sm:w-1/4 px-3 py-2 sm:truncate text-sm text-gray-900 dark:text-white">
                            {album.artist}
                          </td>
                          <td className="sm:max-w-0 sm:w-1/4 px-3 py-2 sm:truncate text-sm text-gray-900 dark:text-white">
                            {album.title}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.year}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.cd && ICONS.CHECK}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.aotd && ICONS.CHECK}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.favorite && ICONS.CHECK}
                          </td>
                          <td className="sm:w-auto px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <TableButton
                              onClick={() =>
                                handleRouteChange(
                                  `${ROUTES_ADMIN.edit.href}/${album.id}`,
                                )
                              }
                            >
                              Edit
                            </TableButton>
                            <span className="ml-1" />
                            <TableButton
                              onClick={() =>
                                handleRouteChange(
                                  `${ROUTES_ADMIN.delete.href}/${album.id}`,
                                )
                              }
                            >
                              Delete
                            </TableButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Admin;
