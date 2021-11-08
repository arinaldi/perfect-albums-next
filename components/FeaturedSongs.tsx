import useAuthStore from 'hooks/useAuthStore';
import { Song } from 'utils/types';
import Layout from 'components/Layout';
import Button from 'components/Button';
import { DeleteIcon } from 'components/Icons';

interface Props {
  data: {
    songs: Song[];
  };
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
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data.songs.map((song) => (
          <div
            className="border border-gray-200 bg-white rounded-md shadow-sm p-4 dark:bg-gray-700 dark:border-black"
            key={song.id}
          >
            <div className="text-xl font-semibold mb-1 dark:text-white">
              {song.title}
            </div>
            <div className="text-gray-500 mb-2 dark:text-white">
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
                  className="cursor-pointer ml-2 dark:text-white"
                  onClick={() => onDeleteOpen(song)}
                >
                  <DeleteIcon />
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
