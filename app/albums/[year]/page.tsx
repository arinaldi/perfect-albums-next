import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { formatFavorites } from 'utils';
import { createClient } from 'utils/supabase/server';
import EditRankings from './EditRankings';

interface Props {
  params: Promise<{
    year: string;
  }>;
}

export const metadata = {
  title: 'Edit rankings | Perfect Albums',
};

export default async function EditRankingsPage(props: Props) {
  const supabase = await createClient();
  const { year } = await props.params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

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
  const favoritesThisYear = favorites[year];

  if (!favoritesThisYear) {
    notFound();
  }

  return <EditRankings favorites={favoritesThisYear} />;
}
