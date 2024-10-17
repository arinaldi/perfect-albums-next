import 'server-only';
import invariant from 'tiny-invariant';

import { formatReleases } from '@/utils';
import { createClient } from '@/utils/supabase/server';
import NewReleases from './NewReleases';

export const revalidate = 60;
export const metadata = {
  title: 'New releases | Perfect Albums',
};

export default async function NewReleasesPage() {
  const supabase = createClient();
  const { data } = await supabase.from('releases').select('*').order('artist');
  const {
    data: { user },
  } = await supabase.auth.getUser();

  invariant(data);

  return (
    <NewReleases count={data.length} data={formatReleases(data)} user={user} />
  );
}
