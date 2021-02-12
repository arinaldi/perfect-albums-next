import Cookies from 'js-cookie';

const KEY = 'perfectalbums';

export const setToken = (token) => {
  Cookies.set(KEY, token, { expires: 7 });
};

export const getToken = () => (
  Cookies.get(KEY) || ''
);

export const removeToken = () => {
  Cookies.remove(KEY);
};
