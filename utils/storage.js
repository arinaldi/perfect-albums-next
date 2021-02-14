import Cookies from 'js-cookie';

export const COOKIE_KEY = 'perfectalbums';

export function setToken(token) {
  Cookies.set(COOKIE_KEY, token, { expires: 7 });
}

export function getToken() {
  return Cookies.get(COOKIE_KEY) || '';
}

export function removeToken() {
  Cookies.remove(COOKIE_KEY);
}
