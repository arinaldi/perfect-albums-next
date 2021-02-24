import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { gql } from 'graphql-request';

import { gqlFetcher } from 'utils/api';
import TopAlbums from 'components/TopAlbums';

const GET_FAVORITES = gql`
  {
    favorites {
      artist
      title
      year
    }
  }
`;

export default function TopAlbumsPage({ favorites }) {
  const router = useRouter();
  const { data, error } = useSWR(GET_FAVORITES, gqlFetcher, {
    initialData: { favorites },
  });
  const [value, setValue] = useState('label');

  function handleChange(event) {
    const { value } = event.target;
    setValue(value);
    router.push(`${router.pathname}${value}`);
  }

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <TopAlbums
      data={data}
      onChange={handleChange}
      value={value}
    />
  );
}

export async function getStaticProps() {
  const { favorites } = await gqlFetcher(GET_FAVORITES);
  return {
    props: { favorites },
  };
}
