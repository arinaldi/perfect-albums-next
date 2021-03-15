import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/',
    }),
  );

  res.status(200).json({ success: true });
};
