import { GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import { getTitle } from 'utils';
import { Release } from 'utils/types';
import { getReleases } from 'pages/api/releases';
import NewReleases from 'components/NewReleases';
import AppMessage from 'components/AppMessage';

interface Props {
  releases: Release[];
}

export default function NewReleasesPage({ releases }: Props) {
  const { data, error } = useSWR('/api/releases', {
    fallbackData: { releases },
  });

  if (error || !data) return <AppMessage />;

  return (
    <>
      <Head>
        <title>{getTitle('New Releases')}</title>
      </Head>
      <NewReleases data={data.releases} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const releases = await getReleases();

  return {
    props: { releases },
    revalidate: 5,
  };
};
