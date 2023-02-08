import 'server-only';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import NewReleases from 'app/releases/NewReleases';
import { Database } from 'utils/db-types';

export const revalidate = 10;
export const metadata = {
  title: 'Perfect Albums | New Releases',
};

export default async function NewReleasesPage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });

  return <NewReleases releases={data ?? []} user={user} />;
}
