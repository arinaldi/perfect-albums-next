import { NextApiRequest, NextApiResponse } from 'next';

import { SORT_DIRECTION } from 'constants/index';
import { parseQuery } from 'utils';
import supabase from 'utils/supabase';
import { Album } from 'utils/types';

const { ASC } = SORT_DIRECTION;

interface Payload {
  albums: Album[];
  count: number;
}

async function getAlbums(queries: NextApiRequest['query']): Promise<Payload> {
  let {
    artist,
    direction,
    page,
    per_page: perPage,
    sort,
    studio,
    title,
  } = queries;
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

  let query = supabase
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

export default async function albums(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { albums, count } = await getAlbums(req.query);
    res.status(200).json({ success: true, albums, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
