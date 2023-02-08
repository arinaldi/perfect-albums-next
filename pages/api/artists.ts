import { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

interface Artist {
  artist: string;
}

async function getArtists(supabase: SupabaseClient): Promise<string[]> {
  // https://www.jeffreyknox.dev/blog/postgresql-functions-in-supabase/
  const { data, error } = await supabase.rpc('get_artists');
  const artists: Artist[] = data;

  if (error) throw error;
  if (artists) return artists.map((a) => a.artist);
  return [];
}

export default async function artists(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const supabase = createServerSupabaseClient({ req, res });

  try {
    const artists = await getArtists(supabase);
    res.status(200).json({ success: true, artists });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
