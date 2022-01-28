import { GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import { MODAL_TYPES } from 'constants/index';
import { getTitle } from 'utils';
import { Song } from 'utils/types';
import { getSongs } from 'pages/api/songs';
import useStore from 'hooks/useStore';
import FeaturedSongs from 'components/FeaturedSongs';
import AppMessage from 'components/AppMessage';

interface Props {
  songs: Song[];
}

export default function FeaturedSongsPage({ songs }: Props) {
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
        data={data.songs}
        onCreateOpen={handleCreateOpen}
        onDeleteOpen={handleDeleteOpen}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const songs = await getSongs();

  return {
    props: { songs },
    revalidate: 5,
  };
};
