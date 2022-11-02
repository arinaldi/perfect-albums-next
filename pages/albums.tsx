import { ChangeEvent, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { getTitle } from 'utils';
import { Album } from 'utils/types';
import { getFavorites } from 'pages/api/favorites';
import TopAlbums from 'components/TopAlbums';
import AppMessage from 'components/AppMessage';

interface Props {
  favorites: Album[];
}

export default function TopAlbumsPage({ favorites }: Props) {
  const router = useRouter();
  const { data, error } = useSWR('/api/favorites', {
    fallbackData: { favorites },
  });
  const [value, setValue] = useState('label');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setValue(value);
    router.push(`${router.pathname}${value}`);
  }

  if (error || !data) return <AppMessage />;

  return (
    <>
      <Head>
        <title>{getTitle('Top Albums')}</title>
      </Head>
      <TopAlbums data={data.favorites} onChange={handleChange} value={value} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const favorites = await getFavorites(supabase);

  return {
    props: { favorites },
  };
}
