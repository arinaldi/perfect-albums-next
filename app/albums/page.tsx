import 'server-only';
import TopAlbums from 'app/albums/TopAlbums';
import { createServerClient } from 'utils/supabase-server';

export const revalidate = 10;
export const metadata = {
  title: 'Top Albums | Perfect Albums',
};

export default async function TopAlbumsPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  return <TopAlbums albums={data ?? []} />;
}
