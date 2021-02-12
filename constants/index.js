export const BASE_URL = 'https://perfectalbums.herokuapp.com';

export const DECADES = [
  {
    label: '10s',
    link: '#2019',
  },
  {
    label: '00s',
    link: '#2009',
  },
  {
    label: '90s',
    link: '#1999',
  },
  {
    label: '80s',
    link: '#1989',
  },
  {
    label: '70s',
    link: '#1976',
  },
];

export const DISPATCH_TYPES = {
  SIGN_IN_USER: 'SIGN_IN_USER',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
  OPEN_TOAST: 'OPEN_TOAST',
  CLOSE_TOAST: 'CLOSE_TOAST',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
};

export const ICONS = {
  CHECK: '✔',
  DOWN: '↓',
  UP: '↑',
  X: '✖',
  PENCIL: '✎',
};

export const MESSAGES = {
  ALBUM_PREFIX: 'Album successfully',
  SONG_PREFIX: 'Song successfully',
  RELEASE_PREFIX: 'Release successfully',
  UNAUTHORIZED: 'You are unauthorized to perform this operation',
  SIGNIN: 'Invalid username or password',
  ERROR: 'Something went wrong',
  NO_DATA: 'No Data',
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};
