import 'server-only';
import invariant from 'tiny-invariant';

import { formatFavorites } from 'utils';
import { createClient } from 'utils/supabase/server';
import TopAlbums from './TopAlbums';

export const metadata = {
  title: 'Top albums | Perfect Albums',
};

export default async function TopAlbumsPage() {
  const supabase = await createClient();
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

  invariant(data);

  const favorites = formatFavorites(data);

  return <TopAlbums count={data.length} favorites={favorites} />;
}
