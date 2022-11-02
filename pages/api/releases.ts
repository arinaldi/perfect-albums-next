import { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

import { Release } from 'utils/types';

export async function getReleases(
  supabase: SupabaseClient,
): Promise<Release[]> {
  const { data: releases, error } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });

  if (error) throw error;
  if (releases) return releases;
  return [];
}

export default async function releases(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabase = createServerSupabaseClient({ req, res });

  try {
    const releases = await getReleases(supabase);
    res.status(200).json({ success: true, releases });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
