import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { decodeSupabaseToken, getToken } from 'utils/supabase';

const auth = nextConnect().use(
  async (req: NextApiRequest, res: NextApiResponse, next) => {
    const token = getToken(req.headers.authorization);
    const user = await decodeSupabaseToken(token);

    if (user) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  },
);

export default auth;
