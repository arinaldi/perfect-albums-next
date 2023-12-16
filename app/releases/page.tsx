import 'server-only';
import { cookies } from 'next/headers';

import NewReleases from 'app/releases/NewReleases';
import { createClient } from 'utils/supabase/server';

export const revalidate = 10;
export const metadata = {
  title: 'New releases | Perfect albums',
};

export default async function NewReleasesPage() {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <NewReleases releases={data ?? []} session={session} />;
}
