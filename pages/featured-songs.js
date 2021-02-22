import useSWR from 'swr';
import { gql } from 'graphql-request';

import { DISPATCH_TYPES, ICONS, MODAL_TYPES } from 'constants/index';
import { gqlFetcher } from 'utils/api';
import { useApp } from 'components/Provider';

export const GET_SONGS = gql`
  {
    songs {
      id
      artist
      title
      link
    }
  }
`;

export default function FeaturedSongs({ songs }) {
  const [state, dispatch] = useApp();
  const {
    isLoading,
    user: { isAuthenticated },
  } = state;
  const { data, error } = useSWR(GET_SONGS, gqlFetcher, {
    initialData: { songs },
  });

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  function handleCreateOpen() {
    dispatch({
      payload: {
        type: MODAL_TYPES.FEATURED_SONGS_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  function handleDeleteOpen(data) {
    dispatch({
      payload: {
        data: { ...data, dataType: 'Song' },
        type: MODAL_TYPES.FEATURED_SONGS_DELETE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Featured Songs</h1>
        {isAuthenticated && !isLoading && (
          <button
            className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
            onClick={handleCreateOpen}
          >
            New
          </button>
        )}
      </div>
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
                  onClick={() => handleDeleteOpen(song)}
                >
                  {ICONS.X}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { songs } = await gqlFetcher(GET_SONGS);
  return {
    props: { songs },
  };
}
