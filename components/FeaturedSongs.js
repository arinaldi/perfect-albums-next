import { ICONS } from 'constants/index';
import { useAppState } from 'components/Provider';
import Layout from 'components/Layout';

export default function FeaturedSongs({ data, onCreateOpen, onDeleteOpen }) {
  const {
    isLoading,
    user: { isAuthenticated },
  } = useAppState();

  const NewButton = isAuthenticated && !isLoading
    ? (
      <button
        className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
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
            className="border border-gray-200 bg-white rounded-md shadow-sm p-4"
            key={song.id}
          >
            <div className="text-xl font-semibold mb-1">{song.title}</div>
            <div className="text-gray-500 mb-2">{song.artist}</div>
            <div>
              <a
                className="text-blue-600"
                href={song.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Listen
              </a>
              {isAuthenticated && !isLoading && (
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
}
