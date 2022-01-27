import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/outline';

import { APP_MESSAGE_TYPES, ROUTES_ADMIN, SORT_VALUE } from 'constants/index';
import { getSortIcon } from 'utils';
import useAdminState from 'hooks/useAdminState';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';
import StudioFilter from 'components/StudioFilter';
import TableSkeleton from 'components/TableSkeleton';
import AppMessage from 'components/AppMessage';
import Button from 'components/Button';
import TableButton from 'components/TableButton';

const { ARTIST, TITLE, YEAR } = SORT_VALUE;

export default function Admin() {
  const router = useRouter();
  const {
    albums,
    artistSearch,
    artistSearchRef,
    cdTotal,
    direction,
    handlers,
    isLoading,
    sort,
    titleSearch,
    titleSearchRef,
    total,
  } = useAdminState();
  const { onArtistChange, onClear, onSort, onTitleChange } = handlers;

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
        <div className="flex justify-between mt-2 sm:mt-0 sm:ml-4">
          <div className="flex">
            <Button onClick={onClear}>Clear</Button>
            <span className="ml-1" />
            <Button onClick={() => handleRouteChange(ROUTES_ADMIN.create.href)}>
              New
            </Button>
          </div>
          <div className="inline sm:hidden">
            <StudioFilter />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Pagination />
        <div className="mx-2" />
        <PerPage />
        <div className="mx-2" />
        <div className="hidden sm:block">
          <StudioFilter />
        </div>
      </div>

      {albums.length === 0 && !isLoading ? (
        <AppMessage message="No results found" type={APP_MESSAGE_TYPES.INFO} />
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
                          className="odd:bg-gray-100 even:bg-gray-0 dark:odd:bg-gray-700 dark:even:bg-gray-800"
                        >
                          <td className="sm:max-w-0 sm:w-1/4 px-3 py-2 sm:truncate text-sm text-gray-900 dark:text-white">
                            {album.artist}
                          </td>
                          <td className="sm:max-w-0 sm:w-1/4 px-3 py-2 sm:truncate text-sm text-gray-900 dark:text-white">
                            {album.studio ? <span>*</span> : null}
                            <span>{album.title}</span>
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.year}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.cd ? (
                              <CheckIcon className="inline w-5 h-5" />
                            ) : null}
                          </td>
                          <td className="sm:w-1/12 px-3 py-2 text-sm text-gray-900 dark:text-white">
                            {album.favorite ? (
                              <CheckIcon className="inline w-5 h-5" />
                            ) : null}
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
}
