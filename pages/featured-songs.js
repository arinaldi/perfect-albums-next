import useSWR from 'swr';
import { gql } from 'graphql-request';

import { DISPATCH_TYPES, ICONS, MODAL_TYPES } from 'constants/index';
import { gqlFetcher } from 'utils/api';
import { useAppDispatch } from 'components/Provider';
import FeaturedSongs from 'components/FeaturedSongs';

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

export default function FeaturedSongsPage({ songs }) {
  const dispatch = useAppDispatch();
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
    <FeaturedSongs
      data={data}
      onCreateOpen={handleCreateOpen}
      onDeleteOpen={handleDeleteOpen}
    />
  );
}

export async function getStaticProps() {
  const { songs } = await gqlFetcher(GET_SONGS);
  return {
    props: { songs },
  };
}
