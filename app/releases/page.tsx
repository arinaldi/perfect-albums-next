import 'server-only';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import NewReleases from 'app/releases/NewReleases';
import { Release } from 'utils/types';

export const revalidate = 60;

export default async function NewReleasesPage() {
  const supabase = createServerComponentSupabaseClient({ cookies, headers });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });
  const releases = data as Release[];

  return <NewReleases releases={releases} user={user} />;
}
