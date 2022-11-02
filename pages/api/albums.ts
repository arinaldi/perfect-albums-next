import { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

import { SORT_DIRECTION } from 'utils/constants';
import { parseAdminQuery } from 'utils';
import { Album } from 'utils/types';

const { ASC, DESC } = SORT_DIRECTION;

interface Payload {
  albums: Album[];
  count: number;
}

async function getAlbums(
  supabase: SupabaseClient,
  queries: NextApiRequest['query'],
): Promise<Payload> {
  const { artist, page, perPage, sort, studio, title } =
    parseAdminQuery(queries);
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

  const { data: albums, count, error } = await query;

  if (error) throw error;

  return { albums: albums || [], count: count || 0 };
}

export default async function albums(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabase = createServerSupabaseClient({ req, res });

  try {
    const { albums, count } = await getAlbums(supabase, req.query);
    res.status(200).json({ success: true, albums, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
