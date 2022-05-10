import { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';
import { Release } from 'utils/types';

export async function getReleases(): Promise<Release[]> {
  const { data: releases, error } = await supabase
    .from<Release>('releases')
    .select('*')
    .order('artist', { ascending: true });

  if (error) throw error;
  if (releases) return releases;
  return [];
}

export default async function releases(
  _: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const releases = await getReleases();
    res.status(200).json({ success: true, releases });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
