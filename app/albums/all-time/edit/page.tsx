import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { parseAdminQuery } from '@/utils';
import { SORT_DIRECTION } from '@/utils/constants';
import { createClient } from 'utils/supabase/server';
import { getUser } from '@/utils/supabase/user';
import EditAllTimeRankings, {
  type AllTimeListItem,
} from './EditAllTimeRankings';

export const metadata: Metadata = {
  title: 'Edit all-time rankings | Perfect Albums',
};
const { ASC, DESC } = SORT_DIRECTION;

type SearchParams = {
  [key: string]: string;
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function EditAllTimeRankingsPage(props: Props) {
  const user = await getUser();

  if (!user) {
    notFound();
  }

  const supabase = await createClient();
  const searchParams = await props.searchParams;
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
    rankingId: r.id,
    title: r.album?.title ?? '',
    year: r.album?.year ?? '',
  }));
  const { sort, title } = parseAdminQuery(searchParams);
  const [sortProp, desc] = sort.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  let candidates: AllTimeListItem[] = [];

  if (title) {
    let query = supabase
      .from('albums')
      .select(
        `
          artist,
          id,
          title,
          year,
          ranking:rankings!inner(
            all_time_position,
            id,
            position
          )
        `,
      )
      .gte('rankings.position', 1)
      .ilike('title', `%${title}%`)
      .range(0, 24)
      .order('artist', { ascending: direction === ASC });

    if (sortProp) {
      query = query.order(sortProp, { ascending: direction === ASC });
    }

    const { data } = await query;

    invariant(data);

    candidates = data.map((d) => ({
      allTimeRanking: d.ranking?.all_time_position ?? 0,
      artist: d.artist,
      id: d.id,
      ranking: d.ranking?.position ?? 0,
      rankingId: d.ranking?.id ?? 0,
      title: d.title,
      year: d.year,
    }));
  }

  return (
    <EditAllTimeRankings candidates={candidates} favorites={allTimeFavorites} />
  );
}
