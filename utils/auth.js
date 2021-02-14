import { BASE_URL } from '../constants';
import { COOKIE_KEY } from './storage';

export async function isTokenValid(req) {
  let token = req.headers.cookie;

  if (!token) return { isValid: null, token: null };

  token = token.replace(`${COOKIE_KEY}=`, '');
  const { status } = await fetch(`${BASE_URL}/api/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return { isValid: status === 200, token };
}
