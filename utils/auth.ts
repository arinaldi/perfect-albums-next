import { BASE_URL } from 'constants/index';

export async function isTokenValid(token: string): Promise<boolean> {
  if (!token) return false;

  const { status } = await fetch(`${BASE_URL}/api/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return status === 200;
}
