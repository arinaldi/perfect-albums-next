import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { getTitle } from 'utils';
import { Song } from 'utils/types';
import { getSongs } from 'pages/api/songs';
import FeaturedSongs from 'components/FeaturedSongs';
import AppMessage from 'components/AppMessage';

interface Props {
  songs: Song[];
}

export default function FeaturedSongsPage({ songs }: Props) {
  const { data, error } = useSWR('/api/songs', {
    fallbackData: { songs },
  });

  if (error || !data) return <AppMessage />;

  return (
    <>
      <Head>
        <title>{getTitle('Featured Songs')}</title>
      </Head>
      <FeaturedSongs data={data.songs} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const songs = await getSongs(supabase);

  return {
    props: { songs },
  };
}
