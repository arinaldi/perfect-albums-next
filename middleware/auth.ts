import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { decodeSupabaseToken } from 'utils/supabase';

const auth = nextConnect().use(
  async (req: NextApiRequest, res: NextApiResponse, next) => {
    const token = req.cookies['sb:token'];
    const user = await decodeSupabaseToken(token);

    if (user) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  },
);

export default auth;
