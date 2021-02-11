import Head from 'next/head';
import useSWR from 'swr';
import { request, gql } from 'graphql-request';

import Tester from 'components/Tester';

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

export default function Home() {
  const { data, error } = useSWR(GET_FAVORITES, fetcher);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="p-4">
      <Head>
        <title>Perfect Albums</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-semibold">Top Albums</h1>
        <Tester />
        <ul>
          {data.favorites.map((item, index) => (
            <li key={index}>
              {item.artist} – {item.title}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
