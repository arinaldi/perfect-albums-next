import { ChangeEvent } from 'react';
import { ArrowUpIcon } from '@heroicons/react/outline';

import { DECADES } from 'constants/index';
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
      <span className="ml-3 p-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold dark:bg-gray-700">
        {data.length.toLocaleString()}
      </span>
    </>
  );

  const DecadeSelect = (
    <select
      className="py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-black dark:text-white"
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
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object.entries(formatFavorites(data))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <div key={year}>
              <div className="flex justify-between items-center">
                <h4 id={year} className="text-xl font-semibold dark:text-white">
                  {year}
                </h4>
                <div className="px-2 py-1 mr-4 rounded-md bg-gray-100 text-xl font-semibold dark:text-white dark:bg-gray-700">
                  {favorites.length.toLocaleString()}
                </div>
              </div>
              <ul data-testid={`list-${year}`} className="list-disc ml-6 p-1">
                {favorites.map((album, index) => (
                  <li key={index} className="dark:text-white">
                    {album.artist} &ndash; {album.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <a
        className="fixed bottom-0 right-0 p-5 text-gray-500 dark:text-gray-200"
        href="#top"
      >
        <ArrowUpIcon className="inline w-4 h-4 mr-1" />
        <span>Top</span>
      </a>
    </Layout>
  );
}
