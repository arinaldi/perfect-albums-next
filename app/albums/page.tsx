import 'server-only';
import invariant from 'tiny-invariant';

import { formatFavorites } from 'utils';
import { supabase } from 'utils/supabase/general';
import TopAlbums from './TopAlbums';

export const metadata = {
  title: 'Top albums | Perfect Albums',
};

async function getAlbums() {
  'use cache';
  const { data } = await supabase
    .from('albums')
    .select(
      `
        artist,
        artist_title,
        cd,
        created_at,
        favorite,
        id,
        studio,
        title,
        year,
        ranking:rankings (
          position
      )
      `,
    )
    .eq('favorite', true)
    .order('artist', { ascending: true });

  return data;
}

export default async function TopAlbumsPage() {
  const data = await getAlbums();

  invariant(data);

  const favorites = formatFavorites(data);

  return <TopAlbums count={data.length} favorites={favorites} />;
}
