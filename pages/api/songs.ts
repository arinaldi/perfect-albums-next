import { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';
import { Song } from 'utils/types';

export async function getSongs(): Promise<Song[]> {
  const { data: songs, error } = await supabase
    .from<Song>('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (songs) return songs;
  return [];
}

export default async function songs(_: NextApiRequest, res: NextApiResponse) {
  try {
    const songs = await getSongs();
    res.status(200).json({ success: true, songs });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
