import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServerClient } from '@supabase/supabase-auth-helpers/nextjs';

async function getArtists(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<string[]> {
  // https://www.jeffreyknox.dev/blog/postgresql-functions-in-supabase/
  const { data: artists, error } = await supabaseServerClient({ req, res }).rpc(
    'get_artists',
  );

  if (error) throw error;
  if (artists) return artists.map((a) => a.artist);
  return [];
}

export default async function artists(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const artists = await getArtists(req, res);
    res.status(200).json({ success: true, artists });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
