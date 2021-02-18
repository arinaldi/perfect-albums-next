import { BASE_URL } from '../constants';
import { COOKIE_KEY } from './storage';

export async function isTokenValid(req) {
  const token = req.cookies[COOKIE_KEY];

  if (!token) return false;

  const { status } = await fetch(`${BASE_URL}/api/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return status === 200;
}
