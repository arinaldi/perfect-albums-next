import { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

import { Album } from 'utils/types';

export async function getFavorites(supabase: SupabaseClient): Promise<Album[]> {
  const { data: favorites, error } = await supabase
    .from('albums')
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
  const supabase = createServerSupabaseClient({ req, res });

  try {
    const favorites = await getFavorites(supabase);
    res.status(200).json({ success: true, favorites });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
