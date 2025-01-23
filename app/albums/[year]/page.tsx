import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { createClient } from 'utils/supabase/server';
import { getUser } from '@/utils/supabase/user';
import { AllTimeListItem } from '../all-time/edit/EditAllTimeRankings';
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
  const user = await getUser();

  if (!user) {
    notFound();
  }

  const supabase = await createClient();
  const { year } = await props.params;
  const { data: albums } = await supabase
    .from('albums')
    .select(
      `
      artist,
      id,
      title,
      year,
      ranking:rankings (
        all_time_position,
        id,
        position
      )
    `,
    )
    .match({ favorite: true, year });

  invariant(albums);

  const favorites: AllTimeListItem[] = albums.map((a) => ({
    allTimeRanking: a.ranking?.all_time_position ?? 0,
    artist: a.artist,
    id: a.id,
    ranking: a.ranking?.position ?? 0,
    rankingId: a.ranking?.id ?? 0,
    title: a.title,
    year: a.year,
  }));

  return <EditRankings favorites={favorites} />;
}
