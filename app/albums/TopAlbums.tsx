'use client';
import { ChangeEvent, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

import { formatFavorites, sortDesc } from 'utils';
import { DECADES, ROUTE_HREF, SPOTIFY_URL } from 'utils/constants';
import { Album } from 'utils/types';
import AppLayout from 'components/AppLayout';

interface Props {
  albums: Album[];
}

export default function TopAlbums({ albums }: Props) {
  const [decade, setDecade] = useState('jump');

  function onChange({ target: { value } }: ChangeEvent<HTMLSelectElement>) {
    setDecade(value);
    window.location.href = `${ROUTE_HREF.TOP_ALBUMS}#${value}`;
  }

  const DecadeSelect = (
    <select
      className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
      name="decade"
      onChange={onChange}
      value={decade}
    >
      <option disabled value="jump">
        Decade
      </option>
      {DECADES.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  );

  return (
    <AppLayout
      title={
        <div className="flex items-end gap-2">
          <span>Top Albums</span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xl font-semibold dark:bg-gray-700">
            {albums.length.toLocaleString()}
          </span>
        </div>
      }
      titleAction={DecadeSelect}
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(formatFavorites(albums))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <div key={year}>
              <div className="flex items-center justify-between">
                <h4 id={year} className="text-xl font-semibold dark:text-white">
                  {year}
                </h4>
                <div className="mr-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 font-semibold dark:bg-gray-700 dark:text-white">
                  {favorites.length.toLocaleString()}
                </div>
              </div>
              <ul className="ml-6 list-disc p-1">
                {favorites.map(({ artist, title }, index) => {
                  const query = encodeURI(`${artist} ${title}`);
                  const url = `${SPOTIFY_URL}/${query}`;

                  return (
                    <li key={index} className="dark:text-white">
                      {artist} &ndash;{' '}
                      <a
                        className="text-blue-700 hover:underline dark:text-blue-500"
                        href={url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>
      <a
        className="fixed bottom-0 right-0 p-5 text-gray-500 dark:text-gray-200"
        href="#top"
      >
        <ArrowUpIcon className="mr-1 inline h-4 w-4" />
        <span>Top</span>
      </a>
    </AppLayout>
  );
}
