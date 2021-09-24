import { FC } from 'react';
import { useRouter } from 'next/router';

import { ROUTES_ADMIN, SORT_VALUE } from 'constants/index';
import { getSortIcon } from 'utils';
import useAdminState from 'hooks/useAdminState';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';
import TableSkeleton from 'components/TableSkeleton';
import AppMessage from 'components/AppMessage';
import Button from 'components/Button';
import TableButton from 'components/TableButton';
import { CheckIcon } from 'components/Icons';

const { ARTIST, TITLE, YEAR } = SORT_VALUE;

const Admin: FC = () => {
  const router = useRouter();
  const {
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
    sort,
    titleSearch,
    titleSearchRef,
    total,
  } = useAdminState();
  const {
    onArtistChange,
    onClear,
    onFirst,
    onLast,
    onNext,
    onPerPageChange,
    onPrevious,
    onSort,
    onTitleChange,
  } = handlers;

  function handleRouteChange(pathname: string) {
    router.push({
      pathname,
      query: router.query,
    });
  }

  const Title = (
    <>
      Admin
      <span className="ml-3 px-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold dark:bg-gray-700">
        {isLoading ? '—' : total.toLocaleString()}
      </span>
    </>
  );

  const AppVersion = (
    <div className="dark:text-white">
      <code className="mr-3">{process.env.NEXT_PUBLIC_APP_VERSION}</code>
      <span className="mr-1 px-1 rounded-md bg-gray-100 text-md sm:text-lg font-semibold dark:bg-gray-700">
        {cdTotal === 0 ? '—' : cdTotal}
      </span>
      CDs
    </div>
  );

  return (
    <Layout title={Title} titleAction={AppVersion}>
      <div className="block sm:flex sm:justify-between sm:items-center mb-4">
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
          id="artist-search"
          name="artist"
          onChange={onArtistChange}
          placeholder="Search artist"
          ref={artistSearchRef}
          type="text"
          value={artistSearch}
        />
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm sm:ml-4 mt-2 sm:mt-0 border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
          id="title-search"
          name="title"
          onChange={onTitleChange}
          placeholder="Search title"
          ref={titleSearchRef}
          type="text"
          value={titleSearch}
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
          currentPage={page}
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
                        onClick={() => onSort(ARTIST)}
                        scope="col"
                      >
                        {sort === ARTIST ? getSortIcon(direction) : null}
                        Artist
                      </th>
                      <th
                        className="sm:w-1/4 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer dark:text-white"
                        onClick={() => onSort(TITLE)}
                        scope="col"
                      >
                        {sort === TITLE ? getSortIcon(direction) : null}
                        Title
                      </th>
                      <th
                        className="sm:w-1/12 px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer dark:text-white"
                        onClick={() => onSort(YEAR)}
                        scope="col"
                      >
                        {sort === YEAR ? getSortIcon(direction) : null}
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
                      {albums.map((album) => (
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
                            {album.cd ? <CheckIcon /> : null}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.aotd ? <CheckIcon /> : null}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.favorite ? <CheckIcon /> : null}
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
