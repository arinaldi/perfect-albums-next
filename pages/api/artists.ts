import { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';

async function getArtists(): Promise<string[]> {
  // https://www.jeffreyknox.dev/blog/postgresql-functions-in-supabase/
  const { data: artists, error } = await supabase.rpc('get_artists');

  if (error) throw error;
  if (artists) return artists.map((a) => a.artist);
  return [];
}

export default async function artists(
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const artists = await getArtists();
    res.status(200).json({ success: true, artists });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
