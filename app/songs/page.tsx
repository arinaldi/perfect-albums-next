import 'server-only';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import FeaturedSongs from 'app/songs/FeaturedSongs';
import { Database } from 'utils/db-types';

export const revalidate = 10;
export const metadata = {
  title: 'Perfect Albums | Featured Songs',
};

export default async function FeaturedSongsPage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  return <FeaturedSongs songs={data ?? []} user={user} />;
}
