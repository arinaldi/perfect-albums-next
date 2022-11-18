import 'server-only';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import FeaturedSongs from 'app/songs/FeaturedSongs';
import { Song } from 'utils/types';

export const revalidate = 60;

export default async function FeaturedSongsPage() {
  const supabase = createServerComponentSupabaseClient({ cookies, headers });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });
  const songs = data as Song[];

  return <FeaturedSongs songs={songs} user={user} />;
}
