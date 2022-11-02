import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const releases = await getReleases(supabase);

  return {
    props: { releases },
  };
}
