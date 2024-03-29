import 'server-only';
import { cookies } from 'next/headers';

import FeaturedSongs from 'app/songs/FeaturedSongs';
import { createClient } from 'utils/supabase/server';

export const revalidate = 60;
export const metadata = {
  title: 'Featured songs | Perfect Albums',
};

export default async function FeaturedSongsPage() {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <FeaturedSongs songs={data ?? []} user={user} />;
}
