import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { getLoginSession } from 'lib/auth';

const handler = nextConnect();

handler
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => { // TODO: move to middlware
    const session = await getLoginSession(req);

    if (session) {
      next();
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.json({ success: true });
  });

export default handler;
