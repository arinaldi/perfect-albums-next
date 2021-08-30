import { ChangeEvent, FC, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getTitle } from 'utils';
import dbConnect from 'lib/dbConnect';
import { Favorite } from 'utils/types';
import { getFavorites } from 'pages/api/favorites';
import TopAlbums from 'components/TopAlbums';
import AppMessage from 'components/AppMessage';

interface Props {
  favorites: Favorite[];
}

const TopAlbumsPage: FC<Props> = ({ favorites }) => {
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
      <TopAlbums data={data} onChange={handleChange} value={value} />
    </>
  );
};

export default TopAlbumsPage;

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const favorites = await getFavorites();

  return {
    props: { favorites },
    revalidate: 5,
  };
};
