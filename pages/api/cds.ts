import { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

async function getCdCount(supabase: SupabaseClient): Promise<number> {
  const { count, error } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  if (error) throw error;
  if (count) return count;
  return 0;
}

export default async function cds(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });

  try {
    const count = await getCdCount(supabase);
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
