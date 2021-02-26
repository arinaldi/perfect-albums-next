import Cookies from 'js-cookie';

export const COOKIE_KEY = 'perfectalbums';

export function setToken(token: string): void {
  Cookies.set(COOKIE_KEY, token, { expires: 7 });
}

export function getToken(): string {
  return Cookies.get(COOKIE_KEY) || '';
}

export function removeToken(): void {
  Cookies.remove(COOKIE_KEY);
}
