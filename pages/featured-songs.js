import useSWR from 'swr';
import { gql } from 'graphql-request';

import { gqlFetcher } from '../utils/api';

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
  const { data, error } = useSWR(GET_SONGS, gqlFetcher, {
    initialData: { songs },
  });

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Featured Songs</h1>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data.songs.map(({ artist, id, link, title }) => (
          <div
            className="border border-gray-200 bg-white rounded-md shadow-sm p-4"
            key={id}
          >
            <div className="text-xl font-semibold mb-1">{title}</div>
            <div className="text-gray-500 mb-2">{artist}</div>
            <a
              className="text-blue-600"
              href={link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Listen
            </a>
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
