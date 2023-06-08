import 'server-only';
import FeaturedSongs from 'app/songs/FeaturedSongs';
import { createServerClient } from 'utils/supabase-server';

export const revalidate = 10;
export const metadata = {
  title: 'Featured Songs | Perfect Albums',
};

export default async function FeaturedSongsPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <FeaturedSongs session={session} songs={data ?? []} />;
}
