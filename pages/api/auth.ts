import { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
