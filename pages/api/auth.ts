import { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
