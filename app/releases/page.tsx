import 'server-only';
import invariant from 'tiny-invariant';

import { formatReleases } from '@/utils';
import { createClient } from '@/utils/supabase/general';
import NewReleases from './NewReleases';

export const metadata = {
  title: 'New releases | Perfect Albums',
};

async function getReleases() {
  'use cache';
  const supabase = createClient();
  const { data } = await supabase.from('releases').select('*').order('artist');

  return data;
}

export default async function NewReleasesPage() {
  const data = await getReleases();

  invariant(data);

  return <NewReleases count={data.length} data={formatReleases(data)} />;
}
