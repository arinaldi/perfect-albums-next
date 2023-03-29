import 'server-only';

import FeaturedSongs from 'app/songs/FeaturedSongs';
import { createClient } from 'utils/supabase-server';

export const revalidate = 10;
export const metadata = {
  title: 'Featured Songs | Perfect Albums',
};

export default async function FeaturedSongsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  return <FeaturedSongs songs={data ?? []} />;
}
