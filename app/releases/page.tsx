import 'server-only';

import NewReleases from 'app/releases/NewReleases';
import { createClient } from 'utils/supabase-server';

export const revalidate = 10;
export const metadata = {
  title: 'New Releases | Perfect Albums',
};

export default async function NewReleasesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });

  return <NewReleases releases={data ?? []} user={user} />;
}
