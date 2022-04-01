import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import { Song } from 'utils/types';

export async function getSongs(): Promise<Song[]> {
  const { data: songs, error } = await supabaseClient
    .from<Song>('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (songs) return songs;
  return [];
}

export default async function songs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const songs = await getSongs();
    res.status(200).json({ success: true, songs });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
