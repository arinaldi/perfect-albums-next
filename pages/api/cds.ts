import { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';
import { Album } from 'utils/types';

export async function getCdCount(): Promise<number> {
  const { count, error } = await supabase
    .from<Album>('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  if (error) throw error;
  if (count) return count;
  return 0;
}

export default async function cds(
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const count = await getCdCount();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
