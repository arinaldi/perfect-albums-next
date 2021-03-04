import { NextApiRequest, NextApiResponse } from 'next';
import Iron from '@hapi/iron';

import { MAX_AGE, setTokenCookie, getTokenCookie } from 'lib/authCookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

export async function setLoginSession(res: NextApiResponse, session: any): Promise<void> {
  const createdAt = Date.now();
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest): Promise<any> {
  const token = getTokenCookie(req);
  let session;

  if (!token) return null;

  try {
    session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  } catch (error) {
    return null;
  }

  const expiresAt = session.createdAt + session.maxAge;

  if (Date.now() > expiresAt) {
    return null;
  }

  return session;
}
