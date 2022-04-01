import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import { Album } from 'utils/types';

export async function getFavorites(): Promise<Album[]> {
  const { data: favorites, error } = await supabaseClient
    .from<Album>('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) throw error;
  if (favorites) return favorites;
  return [];
}

export default async function favorites(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const favorites = await getFavorites();
    res.status(200).json({ success: true, favorites });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
