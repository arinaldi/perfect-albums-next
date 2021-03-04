import { NextApiRequest, NextApiResponse } from 'next';

import { getLoginSession } from 'lib/auth';
import { findUser } from 'lib/user';

export default async function(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const session = await getLoginSession(req);
    let user = null;

    if (session) {
      user = await findUser({ username: session._doc.username });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
