import { TrashIcon } from '@heroicons/react/outline';

import useAuthStore from 'hooks/useAuthStore';
import { Song } from 'utils/types';
import Layout from 'components/Layout';
import Button from 'components/Button';

interface Props {
  data: Song[];
  onCreateOpen: () => void;
  onDeleteOpen: (song: Song) => void;
}

export default function FeaturedSongs({
  data,
  onCreateOpen,
  onDeleteOpen,
}: Props) {
  const user = useAuthStore((state) => state.user);

  const NewButton = user ? <Button onClick={onCreateOpen}>New</Button> : null;

  return (
    <Layout title="Featured Songs" titleAction={NewButton}>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((song) => (
          <div
            className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-black dark:bg-gray-700"
            key={song.id}
          >
            <div className="mb-1 text-xl font-semibold dark:text-white">
              {song.title}
            </div>
            <div className="mb-2 text-gray-500 dark:text-white">
              {song.artist}
            </div>
            <div>
              <a
                className="text-blue-600 dark:text-blue-500"
                href={song.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Listen
              </a>
              {user ? (
                <span
                  className="ml-2 cursor-pointer dark:text-white"
                  onClick={() => onDeleteOpen(song)}
                >
                  <TrashIcon className="inline h-4 w-4" />
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
