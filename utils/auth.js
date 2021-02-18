import cookie from 'cookie';

import { BASE_URL } from '../constants';
import { COOKIE_KEY } from './storage';

export async function isTokenValid(req) {
  const cookies = cookie.parse(req.headers.cookie);
  const token = cookies[COOKIE_KEY];

  if (!token) return { isValid: null, token: null };

  const { status } = await fetch(`${BASE_URL}/api/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return { isValid: status === 200, token };
}
