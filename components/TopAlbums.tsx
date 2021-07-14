import { ChangeEvent, FC } from 'react';

import { DECADES } from 'constants/index';
import { formatFavorites, sortDesc } from 'utils';
import { Favorite } from 'utils/types';
import Layout from 'components/Layout';
import TopAlbumList from 'components/TopAlbumList';
import { ArrowUpIcon } from 'components/Icons';

interface Props {
  data: {
    favorites: Favorite[];
  };
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const TopAlbums: FC<Props> = ({ data, onChange, value }) => {
  const Title = (
    <>
      Top Albums
      <span className="ml-3 p-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold dark:bg-gray-700">
        {data.favorites.length.toLocaleString()}
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object.entries(formatFavorites(data.favorites))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <TopAlbumList
              key={year}
              data={favorites}
              year={year}
              total={favorites.length}
            />
          ))}
      </div>
      <a
        className="fixed bottom-0 right-0 p-5 text-gray-500 dark:text-gray-200"
        href="#top"
      >
        <ArrowUpIcon />
        <span>&nbsp;Top</span>
      </a>
    </Layout>
  );
};

export default TopAlbums;
