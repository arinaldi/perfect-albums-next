import 'server-only';
import { cookies, headers } from 'next/headers';
import {
  createServerComponentSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

import Admin from 'app/admin/Admin';
import { parseAdminQuery } from 'utils';
import { SORT_DIRECTION } from 'utils/constants';
import { Album } from 'utils/types';

export const revalidate = 0;
const { ASC, DESC } = SORT_DIRECTION;

interface Props {
  searchParams: {
    [key: string]: string;
  };
}

interface Payload {
  albums: Album[];
  total: number;
}

async function getAlbums(
  supabase: SupabaseClient,
  searchParams: Props['searchParams'],
): Promise<Payload> {
  const { artist, page, perPage, sort, studio, title } =
    parseAdminQuery(searchParams);
  const [sortProp, desc] = sort.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  const start = (page - 1) * perPage;
  const end = page * perPage - 1;

  let query = supabase
    .from('albums')
    .select('*', { count: 'exact' })
    .ilike('artist', `%${artist}%`)
    .ilike('title', `%${title}%`)
    .range(start, end);

  if (studio === 'true') {
    query = query.eq('studio', true);
  }

  if (sortProp) {
    query = query.order(sortProp, { ascending: direction === ASC });
  } else {
    query = query
      .order('artist', { ascending: true })
      .order('title', { ascending: true });
  }

  if (sortProp === 'artist') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('artist', { ascending: direction === ASC });
  }

  const { data, count: albumCount } = await query;
  const albums = data as Album[];

  return {
    albums: albums ?? [],
    total: albumCount ?? 0,
  };
}

async function getCdCount(supabase: SupabaseClient): Promise<number> {
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  return count ?? 0;
}

export default async function AdminPage({ searchParams }: Props) {
  const supabase = createServerComponentSupabaseClient({ cookies, headers });

  const { albums, total } = await getAlbums(supabase, searchParams);
  const cdTotal = await getCdCount(supabase);

  return <Admin albums={albums} cdTotal={cdTotal} total={total} />;
}