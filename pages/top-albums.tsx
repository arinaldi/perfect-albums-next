import { ChangeEvent, FC, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { fetcher } from 'utils/api';
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
  const { data, error } = useSWR('/api/favorites', fetcher, {
    initialData: { favorites },
  });
  const [value, setValue] = useState('label');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setValue(value);
    router.push(`${router.pathname}${value}`);
  }

  if (error) return <AppMessage />;

  return <TopAlbums data={data} onChange={handleChange} value={value} />;
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
