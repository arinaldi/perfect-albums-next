import { NextApiRequest, NextApiResponse } from 'next';
import {
  supabaseServerClient,
  withApiAuth,
} from '@supabase/supabase-auth-helpers/nextjs';

import { SORT_DIRECTION } from 'constants/index';
import { Album } from 'utils/types';

const { ASC } = SORT_DIRECTION;

interface Payload {
  albums: Album[];
  count: number;
}

function parseQuery(query: string | string[]): string {
  return typeof query === 'string' ? query : query[0];
}

async function getAlbums(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Payload> {
  let {
    artist,
    direction,
    page,
    per_page: perPage,
    sort,
    studio,
    title,
  } = req.query;
  artist = parseQuery(artist);
  direction = parseQuery(direction) || ASC;
  page = parseQuery(page);
  perPage = parseQuery(perPage);
  sort = parseQuery(sort);
  studio = parseQuery(studio);
  title = parseQuery(title);
  const pageNumber = Math.abs(parseInt(page));
  const limit = Math.abs(parseInt(perPage)) || 25;
  const start = (pageNumber - 1) * limit;
  const end = pageNumber * limit - 1;

  let query = supabaseServerClient({ req, res })
    .from('albums')
    .select('*', { count: 'exact' })
    .ilike('artist', `%${artist}%`)
    .ilike('title', `%${title}%`)
    .range(start, end);

  if (studio === 'true') {
    query = query.eq('studio', true);
  }

  if (sort) {
    query = query.order(sort, { ascending: direction === ASC });
  } else {
    query = query
      .order('artist', { ascending: true })
      .order('title', { ascending: true });
  }

  if (sort === 'artist') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('artist', { ascending: direction === ASC });
  }

  const { data: albums, count, error } = await query;

  if (error) throw error;
  return { albums: albums || [], count: count || 0 };
}

export default withApiAuth(async function albums(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { albums, count } = await getAlbums(req, res);
    res.status(200).json({ success: true, albums, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});
