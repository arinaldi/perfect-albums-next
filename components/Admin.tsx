import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { APP_MESSAGE_TYPES, ROUTES_ADMIN, SORT_VALUE } from 'constants/index';
import { generateAlbumQueryString, getSortIcon } from 'utils';
import useAdminAlbums from 'hooks/useAdminAlbums';
import { useAdmin } from 'hooks/useAdminStore';
import useDebounce from 'hooks/useDebounce';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';
import StudioFilter from 'components/StudioFilter';
import TableSkeleton from 'components/TableSkeleton';
import AppMessage from 'components/AppMessage';
import Button from 'components/Button';

const { ARTIST, TITLE, YEAR } = SORT_VALUE;

export default function Admin() {
  const router = useRouter();
  const artistRef = useRef<HTMLInputElement | null>(null);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const debouncedArtist = useDebounce(artist);
  const debouncedTitle = useDebounce(title);
  const { direction, page, perPage, sort, studio, onClear, onSearch, onSort } =
    useAdmin();
  const url = generateAlbumQueryString({
    artist: debouncedArtist,
    direction,
    page,
    perPage,
    sort,
    studio,
    title: debouncedTitle,
  });
  const { albums, cdTotal, total, isLoading } = useAdminAlbums(url);

  useEffect(() => {
    if (debouncedArtist || debouncedTitle) {
      onSearch();
    }
  }, [debouncedArtist, debouncedTitle, onSearch]);

  function handleClear() {
    artistRef?.current?.focus();
    setArtist('');
    setTitle('');
    onClear();
  }

  function handleRouteChange(pathname: string) {
    router.push({
      pathname,
      query: router.query,
    });
  }

  const Title = (
    <>
      Admin
      <span className="ml-3 rounded-md bg-gray-100 px-1 text-xl font-semibold dark:bg-gray-700 sm:text-2xl">
        {isLoading ? '—' : total.toLocaleString()}
      </span>
    </>
  );

  const AppVersion = (
    <div className="dark:text-white">
      <code className="mr-3">{process.env.NEXT_PUBLIC_APP_VERSION}</code>
      <span className="text-md mr-1 rounded-md bg-gray-100 px-1 font-semibold dark:bg-gray-700 sm:text-lg">
        {cdTotal === 0 ? '—' : cdTotal}
      </span>
      CDs
    </div>
  );

  return (
    <Layout title={Title} titleAction={AppVersion}>
      <div className="mb-4 block sm:flex sm:items-center sm:justify-between">
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
          id="artist-search"
          name="artist"
          onChange={(event) => setArtist(event.target.value)}
          placeholder="Search artist"
          ref={artistRef}
          type="text"
          value={artist}
        />
        <input
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:ml-4 sm:mt-0 sm:text-sm"
          id="title-search"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Search title"
          type="text"
          value={title}
        />
        <div className="mt-2 flex justify-between sm:mt-0 sm:ml-4">
          <div className="flex">
            <Button onClick={handleClear}>Clear</Button>
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

      <div className="mb-4 flex justify-center">
        <Pagination lastPage={Math.ceil(total / perPage)} />
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
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 dark:border-black sm:rounded-lg">
                <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-black sm:table-fixed">
                  <thead>
                    <tr>
                      <th
                        className="cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-1/4"
                        onClick={() => onSort(ARTIST)}
                        scope="col"
                      >
                        {sort === ARTIST ? getSortIcon(direction) : null}
                        Artist
                      </th>
                      <th
                        className="cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-1/4"
                        onClick={() => onSort(TITLE)}
                        scope="col"
                      >
                        {sort === TITLE ? getSortIcon(direction) : null}
                        Title
                      </th>
                      <th
                        className="cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-1/12"
                        onClick={() => onSort(YEAR)}
                        scope="col"
                      >
                        {sort === YEAR ? getSortIcon(direction) : null}
                        Year
                      </th>
                      <th
                        className="px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-1/12"
                        scope="col"
                      >
                        CD
                      </th>
                      <th
                        className="px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-1/12"
                        scope="col"
                      >
                        Favorite
                      </th>
                      <th
                        className="whitespace-nowrap px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-[1%]"
                        scope="col"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-black dark:bg-gray-500">
                      {albums.map((album) => (
                        <tr
                          key={album.id}
                          className="even:bg-gray-0 odd:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800"
                        >
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/4 sm:max-w-0 sm:truncate">
                            {album.artist}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/4 sm:max-w-0 sm:truncate">
                            {album.studio ? <span>*</span> : null}
                            <span>{album.title}</span>
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                            {album.year}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                            {album.cd ? (
                              <CheckIcon className="inline h-5 w-5" />
                            ) : null}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                            {album.favorite ? (
                              <CheckIcon className="inline h-5 w-5" />
                            ) : null}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-auto">
                            <PencilIcon
                              className="inline h-4 w-4 cursor-pointer dark:text-white"
                              onClick={() =>
                                handleRouteChange(
                                  `${ROUTES_ADMIN.edit.href}/${album.id}`,
                                )
                              }
                            />
                            <TrashIcon
                              className="ml-4 inline h-4 w-4 cursor-pointer dark:text-white"
                              onClick={() =>
                                handleRouteChange(
                                  `${ROUTES_ADMIN.delete.href}/${album.id}`,
                                )
                              }
                            />
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
