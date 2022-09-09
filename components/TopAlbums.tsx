import { ChangeEvent } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

import { DECADES, SPOTIFY_URL } from 'constants/index';
import { formatFavorites, sortDesc } from 'utils';
import { Album } from 'utils/types';
import Layout from 'components/Layout';

interface Props {
  data: Album[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export default function TopAlbums({ data, onChange, value }: Props) {
  const Title = (
    <>
      Top Albums
      <span className="ml-3 rounded-md bg-gray-100 p-1 text-xl font-semibold dark:bg-gray-700 sm:text-2xl">
        {data.length.toLocaleString()}
      </span>
    </>
  );

  const DecadeSelect = (
    <select
      className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
      name="decade"
      onChange={onChange}
      value={value}
    >
      <option disabled value="label">
        Jump to decade
      </option>
      {DECADES.map(({ label, link }) => (
        <option key={label} value={link}>
          {label}
        </option>
      ))}
    </select>
  );

  return (
    <Layout title={Title} titleAction={DecadeSelect}>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(formatFavorites(data))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <div key={year}>
              <div className="flex items-center justify-between">
                <h4 id={year} className="text-xl font-semibold dark:text-white">
                  {year}
                </h4>
                <div className="mr-4 rounded-md bg-gray-100 px-2 py-1 text-xl font-semibold dark:bg-gray-700 dark:text-white">
                  {favorites.length.toLocaleString()}
                </div>
              </div>
              <ul data-testid={`list-${year}`} className="ml-6 list-disc p-1">
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
    </Layout>
  );
}
