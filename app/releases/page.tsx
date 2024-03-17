import 'server-only';
import { cookies } from 'next/headers';

import NewReleases from 'app/releases/NewReleases';
import { createClient } from 'utils/supabase/server';

export const revalidate = 60;
export const metadata = {
  title: 'New releases | Perfect Albums',
};

export default async function NewReleasesPage() {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NewReleases releases={data ?? []} user={user} />;
}
