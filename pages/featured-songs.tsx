import { FC } from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';

import { DISPATCH_TYPES, MODAL_TYPES } from 'constants/index';
import { fetcher } from 'utils/api';
import dbConnect from 'lib/dbConnect';
import { Song } from 'utils/types';
import { getSongs } from 'pages/api/songs';
import { useAppDispatch } from 'components/Provider';
import FeaturedSongs from 'components/FeaturedSongs';

interface Props {
  songs: Song[];
}

const FeaturedSongsPage: FC<Props> = ({ songs }) => {
  const dispatch = useAppDispatch();
  const { data, error } = useSWR(['/api/songs', true], fetcher, {
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

  function handleDeleteOpen(data: Song) {
    dispatch({
      payload: {
        data,
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
};

export default FeaturedSongsPage;

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const songs = await getSongs();

  return {
    props: { songs },
  };
};
