import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { loadIdToken } from 'auth/firebaseAdmin';

const auth = nextConnect().use(
  async (req: NextApiRequest, res: NextApiResponse, next) => {
    const uid = await loadIdToken(req);

    if (uid) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  },
);

export default auth;
