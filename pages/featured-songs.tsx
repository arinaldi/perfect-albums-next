import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import { MODAL_TYPES } from 'constants/index';
import { getTitle } from 'utils';
import dbConnect from 'lib/dbConnect';
import { Song } from 'utils/types';
import { getSongs } from 'pages/api/songs';
import useStore from 'hooks/useStore';
import FeaturedSongs from 'components/FeaturedSongs';
import AppMessage from 'components/AppMessage';

interface Props {
  songs: Song[];
}

const FeaturedSongsPage: FC<Props> = ({ songs }) => {
  const openModal = useStore((state) => state.openModal);
  const { data, error } = useSWR('/api/songs', {
    fallbackData: { songs },
  });

  if (error || !data) return <AppMessage />;

  function handleCreateOpen() {
    openModal(MODAL_TYPES.FEATURED_SONGS_CREATE);
  }

  function handleDeleteOpen(data: Song) {
    openModal(MODAL_TYPES.FEATURED_SONGS_DELETE, data);
  }

  return (
    <>
      <Head>
        <title>{getTitle('Featured Songs')}</title>
      </Head>
      <FeaturedSongs
        data={data}
        onCreateOpen={handleCreateOpen}
        onDeleteOpen={handleDeleteOpen}
      />
    </>
  );
};

export default FeaturedSongsPage;

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const songs = await getSongs();

  return {
    props: { songs },
    revalidate: 5,
  };
};
