import invariant from 'tiny-invariant';

import { createClient } from 'utils/supabase/server';
import { type AllTimeListItem } from './edit/EditAllTimeRankings';
import AllTimeRankings from './AllTimeRankings';

export const metadata = {
  title: 'All-time albums | Perfect Albums',
};

export default async function AllTimeRankingsPage() {
  const supabase = await createClient();
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
    .gte('all_time_position', 1)
    .order('all_time_position', { ascending: true });

  invariant(rankings);

  const allTimeFavorites: AllTimeListItem[] = rankings.map((r) => ({
    allTimeRanking: r.all_time_position,
    artist: r.album?.artist ?? '',
    id: r.album?.id ?? 0,
    ranking: r.position,
    title: r.album?.title ?? '',
    year: r.album?.year ?? '',
  }));

  return <AllTimeRankings favorites={allTimeFavorites} />;
}
