import 'server-only';
import { cookies } from 'next/headers';
import { type SupabaseClient } from '@supabase/supabase-js';

import Admin from 'app/admin/Admin';
import { parseAdminQuery } from 'utils';
import { SORT_DIRECTION } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { Album } from 'utils/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Admin | Perfect albums',
};
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

  return {
    albums: (data as Album[]) ?? [],
    total: albumCount ?? 0,
  };
}

async function getCdCount(
  supabase: SupabaseClient,
  searchParams: Props['searchParams'],
): Promise<number> {
  const { artist, studio, title } = parseAdminQuery(searchParams);
  let query = supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true)
    .ilike('artist', `%${artist}%`)
    .ilike('title', `%${title}%`);

  if (studio === 'true') {
    query = query.eq('studio', true);
  }

  const { count } = await query;

  return count ?? 0;
}

export default async function AdminPage({ searchParams }: Props) {
  const supabase = createClient(cookies());
  const [{ albums, total }, cdTotal] = await Promise.all([
    getAlbums(supabase, searchParams),
    getCdCount(supabase, searchParams),
  ]);

  return <Admin albums={albums} cdTotal={cdTotal} total={total} />;
}
