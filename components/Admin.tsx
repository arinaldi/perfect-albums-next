import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { APP_MESSAGE_TYPES, ROUTES_ADMIN, SORT_VALUE } from 'constants/index';
import useAdminAlbums from 'hooks/useAdminAlbums';
import useDebounce from 'hooks/useDebounce';
import { generateAlbumsUrl, parseAdminQuery } from 'utils';
import Column from 'components/Column';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';
import SortableColumn from 'components/SortableColumn';
import StudioFilter from 'components/StudioFilter';
import TableSkeleton from 'components/TableSkeleton';
import AppMessage from 'components/AppMessage';
import Button from 'components/Button';

export default function Admin() {
  const router = useRouter();
  const { artist, page, perPage, sort, studio, title } = parseAdminQuery(
    router.query,
  );
  const artistRef = useRef<HTMLInputElement | null>(null);
  const debouncedArtist = useDebounce(artist);
  const debouncedTitle = useDebounce(title);
  const url = generateAlbumsUrl({
    artist: debouncedArtist,
    page,
    perPage,
    sort,
    studio,
    title: debouncedTitle,
  });
  const { albums, cdTotal, total, isLoading } = useAdminAlbums(url);

  useEffect(() => {
    artistRef?.current?.focus();
  }, []);

  function onSearch(key: 'artist' | 'title', value: string) {
    router.replace(
      {
        pathname: ROUTES_ADMIN.base.href,
        query: {
          ...router.query,
          page: 1,
          sort: SORT_VALUE.YEAR,
          [key]: value,
        },
      },
      undefined,
      { shallow: true },
    );
  }

  function onClear() {
    artistRef?.current?.focus();
    router.replace(
      {
        pathname: ROUTES_ADMIN.base.href,
        query: { page: 1 },
      },
      undefined,
      { shallow: true },
    );
  }

  function onRouteChange(pathname: string) {
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
          onChange={(event) => onSearch('artist', event.target.value)}
          placeholder="Search artist"
          ref={artistRef}
          type="text"
          value={artist}
        />
        <input
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:ml-4 sm:mt-0 sm:text-sm"
          id="title-search"
          name="title"
          onChange={(event) => onSearch('title', event.target.value)}
          placeholder="Search title"
          type="text"
          value={title}
        />
        <div className="mt-2 flex justify-between sm:mt-0 sm:ml-4">
          <div className="flex">
            <Button onClick={onClear}>Clear</Button>
            <span className="ml-1" />
            <Button onClick={() => onRouteChange(ROUTES_ADMIN.create.href)}>
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
                      <SortableColumn
                        prop="artist"
                        wrapperClassName="sm:w-1/4 sm:max-w-0"
                      >
                        Artist
                      </SortableColumn>
                      <SortableColumn
                        prop="title"
                        wrapperClassName="sm:w-1/3 sm:max-w-0"
                      >
                        Title
                      </SortableColumn>
                      <SortableColumn prop="year" wrapperClassName="sm:w-1/12">
                        Year
                      </SortableColumn>
                      <Column wrapperClassName="sm:w-1/12">Favorite</Column>
                      <Column wrapperClassName="sm:w-1/12">Actions</Column>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-black dark:bg-gray-500">
                      {albums.map(
                        ({ artist, cd, favorite, id, studio, title, year }) => (
                          <tr
                            key={id}
                            className="even:bg-gray-0 odd:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800"
                          >
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/4 sm:max-w-0 sm:truncate">
                              {artist}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/3 sm:max-w-0 sm:truncate">
                              {cd ? <span className="mr-1">💿</span> : null}
                              <span
                                className={
                                  studio ? 'font-medium italic' : 'font-light'
                                }
                              >
                                {title}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                              {year}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                              {favorite ? (
                                <CheckIcon className="inline h-5 w-5" />
                              ) : null}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                              <PencilIcon
                                className="inline h-4 w-4 cursor-pointer dark:text-white"
                                onClick={() =>
                                  onRouteChange(
                                    `${ROUTES_ADMIN.edit.href}/${id}`,
                                  )
                                }
                              />
                              <TrashIcon
                                className="ml-4 inline h-4 w-4 cursor-pointer dark:text-white"
                                onClick={() =>
                                  onRouteChange(
                                    `${ROUTES_ADMIN.delete.href}/${id}`,
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ),
                      )}
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
