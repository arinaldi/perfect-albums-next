import { NextApiRequest, NextApiResponse } from 'next';
import {
  supabaseServerClient,
  withApiAuth,
} from '@supabase/supabase-auth-helpers/nextjs';

import { Album } from 'utils/types';

async function getCdCount(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<number> {
  const { count, error } = await supabaseServerClient({ req, res })
    .from<Album>('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  if (error) throw error;
  if (count) return count;
  return 0;
}

export default withApiAuth(async function cds(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const count = await getCdCount(req, res);
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});
