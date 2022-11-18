import 'server-only';
import TopAlbums from 'app/albums/TopAlbums';
import supabase from 'utils/supabase';
import { Album } from 'utils/types';

export const revalidate = 10;

export default async function TopAlbumsPage() {
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });
  const albums = data as Album[];

  return <TopAlbums albums={albums} />;
}