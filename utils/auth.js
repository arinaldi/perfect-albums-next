import { BASE_URL } from 'constants/index';
import { COOKIE_KEY } from 'utils/storage';

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
