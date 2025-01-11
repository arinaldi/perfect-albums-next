import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { createClient } from 'utils/supabase/server';
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
  const supabase = await createClient();
  const { year } = await props.params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: rankings } = await supabase
    .from('rankings')
    .select(
      `
            all_time_position,
            id,
            position,
            album:albums (
              artist,
              id,
              title,
              year
            )
          `,
    )
    .eq('year', year)
    .order('position', { ascending: true });

  invariant(rankings);

  const favorites: AllTimeListItem[] = rankings.map((r) => ({
    allTimeRanking: r.all_time_position,
    artist: r.album?.artist ?? '',
    id: r.album?.id ?? 0,
    ranking: r.position,
    rankingId: r.id,
    title: r.album?.title ?? '',
    year: r.album?.year ?? '',
  }));

  return <EditRankings favorites={favorites} />;
}
