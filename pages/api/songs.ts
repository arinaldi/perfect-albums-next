import { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

import { Song } from 'utils/types';

export async function getSongs(supabase: SupabaseClient): Promise<Song[]> {
  const { data: songs, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (songs) return songs;
  return [];
}

export default async function songs(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });

  try {
    const songs = await getSongs(supabase);
    res.status(200).json({ success: true, songs });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
