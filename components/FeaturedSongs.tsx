import { FC } from 'react';

import { ICONS } from 'constants/index';
import { useAuth } from 'hooks/useAuth';
import { Song } from 'utils/types';
import Layout from 'components/Layout';

interface Props {
  data: {
    songs: Song[];
  };
  onCreateOpen: () => void;
  onDeleteOpen: (song: Song) => void;
}

const FeaturedSongs: FC<Props> = ({ data, onCreateOpen, onDeleteOpen }) => {
  const { hasAuth } = useAuth();

  const NewButton = hasAuth
    ? (
      <button
        className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onCreateOpen}
      >
        New
      </button>
    )
    : null;

  return (
    <Layout title="Featured Songs" titleAction={NewButton}>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data.songs.map(song => (
          <div
            className="border border-gray-200 bg-white rounded-md shadow-sm p-4 dark:bg-gray-700 dark:border-black"
            key={song.id}
          >
            <div className="text-xl font-semibold mb-1 dark:text-white">{song.title}</div>
            <div className="text-gray-500 mb-2 dark:text-white">{song.artist}</div>
            <div>
              <a
                className="text-blue-600 dark:text-blue-500"
                href={song.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Listen
              </a>
              {hasAuth && (
                <span
                  className="align-middle cursor-pointer ml-2"
                  onClick={() => onDeleteOpen(song)}
                >
                  {ICONS.X}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FeaturedSongs;
