import { NextApiRequest, NextApiResponse } from 'next';

import { removeTokenCookie } from 'lib/authCookies';

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
}
