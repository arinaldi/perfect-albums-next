import 'server-only';
import { formatSongs } from '@/utils';
import { createClient } from '@/utils/supabase/server';
import FeaturedSongs from './FeaturedSongs';

export const revalidate = 60;
export const metadata = {
  title: 'Featured songs | Perfect Albums',
};

export default async function FeaturedSongsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase.from('songs').select('*').order('artist');

  return (
    <FeaturedSongs
      count={data?.length ?? 0}
      data={formatSongs(data ?? [])}
      user={user}
    />
  );
}
