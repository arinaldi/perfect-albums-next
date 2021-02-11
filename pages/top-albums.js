import useSWR from 'swr';
import { request, gql } from 'graphql-request';

import { formatFavorites, sortDesc } from '../utils';

const BASE_URL = 'https://perfectalbums.herokuapp.com/graphql';
const fetcher = query => request(BASE_URL, query);
const GET_FAVORITES = gql`
  {
    favorites {
      artist
      title
      year
    }
  }
`;

const AlbumCol = (props) => {
  const { data, year, total } = props;

  return (
    <div>
      <h4 id={year} className="text-xl font-semibold">
        {year} ({total})
      </h4>
      <ul data-testid={`list-${year}`} className="list-disc ml-6 p-1">
        {data.map((album, index) => (
          <li key={index}>
            {album.artist} &ndash; {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function TopAlbums() {
  const { data, error } = useSWR(GET_FAVORITES, fetcher);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold pb-4">Top Albums</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object
          .entries(formatFavorites(data.favorites))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <AlbumCol
              key={year}
              data={favorites}
              year={year}
              total={favorites.length}
            />
          ))}
      </div>
    </div>
  );
}
