import 'server-only';

import TopAlbums from 'app/albums/TopAlbums';
import { createClient } from 'utils/supabase-server';

export const revalidate = 10;
export const metadata = {
  title: 'Perfect Albums | Top Albums',
};

export default async function TopAlbumsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  return <TopAlbums albums={data ?? []} />;
}
