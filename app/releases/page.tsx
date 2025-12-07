import 'server-only';
import { Metadata } from 'next';
import invariant from 'tiny-invariant';

import { formatReleases } from '@/utils';
import { supabase } from '@/utils/supabase/general';
import NewReleases from './NewReleases';

export const metadata: Metadata = {
  title: 'New releases | Perfect Albums',
};

async function getReleases() {
  'use cache';
  const { data } = await supabase.from('releases').select('*').order('artist');

  return data;
}

export default async function NewReleasesPage() {
  const data = await getReleases();

  invariant(data);

  return <NewReleases count={data.length} data={formatReleases(data)} />;
}
