'use client';

import { FormEvent, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import {
  APP_MESSAGE_TYPES,
  PER_PAGE,
  ROUTES_ADMIN,
  SORT_VALUE,
} from 'utils/constants';
import { parsePerPageQuery, parseQuery } from 'utils';
import { Album } from 'utils/types';
import Column from 'app/admin/Column';
import Layout from 'app/components/AppLayout';
import Pagination from 'app/admin/Pagination';
import PerPage from 'app/admin/PerPage';
import SortableColumn from 'app/admin/SortableColumn';
import StudioFilter from 'app/admin/StudioFilter';
import AppMessage from 'app/components/AppMessage';
import Button from 'app/components/Button';
import SubmitButton from 'app/components/SubmitButton';

interface Props {
  albums: Album[];
  cdTotal: number;
  total: number;
}

export default function Admin({ albums, cdTotal, total }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = parsePerPageQuery(searchParams.get('perPage'));
  const artistQuery = parseQuery(searchParams.get('artist'));
  const titleQuery = parseQuery(searchParams.get('title'));
  const artistRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    artistRef?.current?.focus();
  }, []);

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    const artist = artistRef?.current?.value;
    const title = titleRef?.current?.value;
    const query = new URLSearchParams(searchParams);
    query.set('page', '1');
    query.set('sort', SORT_VALUE.YEAR);

    if (artist) query.set('artist', artist);
    if (title) query.set('title', title);

    router.replace(`${pathname}?${query.toString()}`);
  }

  function onClear() {
    router.push(`${pathname}?page=1&perPage=${PER_PAGE.SMALL}`);

    if (artistRef?.current) {
      artistRef.current.value = '';
      artistRef.current.focus();
    }

    if (titleRef?.current) {
      titleRef.current.value = '';
    }
  }

  function onRouteChange(pathname: string) {
    router.push(`${pathname}?${searchParams.toString()}`);
  }

  const Title = (
    <>
      Admin
      <span className="ml-3 rounded-md bg-gray-100 px-1 text-xl font-semibold dark:bg-gray-700 sm:text-2xl">
        {total.toLocaleString()}
      </span>
    </>
  );

  const AppVersion = (
    <div className="dark:text-white">
      <code className="mr-3">{process.env.NEXT_PUBLIC_APP_VERSION}</code>
      <span className="text-md mr-1 rounded-md bg-gray-100 px-1 font-semibold dark:bg-gray-700 sm:text-lg">
        {cdTotal.toLocaleString()}
      </span>
      CDs
    </div>
  );

  return (
    <Layout title={Title} titleAction={AppVersion}>
      <form
        className="mb-4 block sm:flex sm:items-center sm:justify-between"
        onSubmit={onSubmit}
      >
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
          defaultValue={artistQuery}
          id="artist-search"
          name="artist"
          placeholder="Search artist"
          ref={artistRef}
          type="text"
        />
        <input
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:ml-4 sm:mt-0 sm:text-sm"
          defaultValue={titleQuery}
          id="title-search"
          name="title"
          placeholder="Search title"
          ref={titleRef}
          type="text"
        />
        <div className="mt-2 flex justify-between sm:mt-0 sm:ml-4">
          <div className="flex gap-1">
            <SubmitButton isSubmitting={false} />
            <Button onClick={onClear}>Clear</Button>
            <Button onClick={() => onRouteChange(ROUTES_ADMIN.create.href)}>
              New
            </Button>
          </div>
          <div className="inline sm:hidden">
            <StudioFilter />
          </div>
        </div>
      </form>

      <div className="mb-4 flex justify-center">
        <Pagination lastPage={Math.ceil(total / perPage)} />
        <div className="mx-2" />
        <PerPage />
        <div className="mx-2" />
        <div className="hidden sm:block">
          <StudioFilter />
        </div>
      </div>

      {albums.length === 0 ? (
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
                            {cd ? (
                              <span className="mr-1 text-xs">💿</span>
                            ) : null}
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
                                onRouteChange(`${ROUTES_ADMIN.edit.href}/${id}`)
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
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
