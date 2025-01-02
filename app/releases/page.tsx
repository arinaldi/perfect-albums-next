import 'server-only';
import invariant from 'tiny-invariant';

import { formatReleases } from '@/utils';
import { createClient } from '@/utils/supabase/server';
import NewReleases from './NewReleases';

export const metadata = {
  title: 'New releases | Perfect Albums',
};

export default async function NewReleasesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('releases').select('*').order('artist');

  invariant(data);

  return <NewReleases count={data.length} data={formatReleases(data)} />;
}
