import { FC } from 'react';

import { ListItem } from 'utils';

interface Props {
  data: ListItem[];
  year: string;
  total: number;
}

const TopAlbumList: FC<Props> = ({ data, year, total }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 id={year} className="text-xl font-semibold dark:text-white">
          {year}
        </h4>
        <div className="px-2 py-1 mr-4 rounded-md bg-gray-100 text-xl font-semibold dark:text-white dark:bg-gray-700">
          {total.toLocaleString()}
        </div>
      </div>
      <ul data-testid={`list-${year}`} className="list-disc ml-6 p-1">
        {data.map((album, index) => (
          <li key={index} className="dark:text-white">
            {album.artist} &ndash; {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAlbumList;
