import 'server-only';
import { cookies } from 'next/headers';

import TopAlbums from 'app/albums/TopAlbums';
import { createClient } from 'utils/supabase/server';

export const revalidate = 60;
export const metadata = {
  title: 'Top albums | Perfect Albums',
};

export default async function TopAlbumsPage() {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  return <TopAlbums albums={data ?? []} />;
}
