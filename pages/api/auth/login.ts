import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import nextConnect from 'next-connect';

import { localStrategy } from 'lib/passwordLocal';
import { setLoginSession } from 'lib/auth';

function authenticate(method: string, req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
}

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user: any = await authenticate('local', req, res);
      const session = { ...user };

      await setLoginSession(res, session);

      res.status(200).send({ success: true });
    } catch (error) {
      res.status(401).send(error.message);
    }
  });
