/* ENUM */

export enum APP_MESSAGE_TYPES {
  ERROR = 'error',
  INFO = 'info',
}

export enum MESSAGES {
  ALBUM_PREFIX = 'Album successfully',
  SONG_PREFIX = 'Song successfully',
  RELEASE_PREFIX = 'Release successfully',
  SIGNIN = 'Invalid username or password',
  ERROR = 'Something went wrong',
  NO_DATA = 'No Data',
}

export enum MODAL_TYPES {
  INITIAL = '',
  FEATURED_SONGS_CREATE = 'Create Featured Song',
  FEATURED_SONGS_DELETE = 'Delete Featured Song',
  NEW_RELEASE_CREATE = 'Create New Release',
  NEW_RELEASE_EDIT = 'Edit New Release',
  NEW_RELEASE_DELETE = 'Delete New Release',
}

export enum PER_PAGE {
  SMALL = 25,
  MEDIUM = 50,
  LARGE = 100,
}

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
  NONE = '',
}

export enum SORT_VALUE {
  ARTIST = 'artist',
  NONE = '',
  TITLE = 'title',
  YEAR = 'year',
}

export enum ROUTE_HREF {
  TOP_ALBUMS = '/albums',
  FEATURED_SONGS = '/songs',
  NEW_RELEASES = '/releases',
  SIGNIN = '/signin',
}

/* CONST */

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3006'
    : 'https://perfect-albums.vercel.app';

export const DECADES = [
  {
    id: '2019',
    label: '10s',
  },
  {
    id: '2009',
    label: '00s',
  },
  {
    id: '1999',
    label: '90s',
  },
  {
    id: '1989',
    label: '80s',
  },
  {
    id: '1977',
    label: '70s',
  },
];

export const MODAL_INITIAL_STATE = {
  data: null,
  type: MODAL_TYPES.INITIAL,
};

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const ROUTES = [
  { href: ROUTE_HREF.TOP_ALBUMS, label: 'Top Albums' },
  { href: ROUTE_HREF.FEATURED_SONGS, label: 'Featured Songs' },
  { href: ROUTE_HREF.NEW_RELEASES, label: 'New Releases' },
];

export const ROUTES_ADMIN = {
  base: { href: '/admin', label: 'Admin' },
  create: { href: '/admin/create', label: 'Admin Create' },
  edit: { href: '/admin/edit', label: 'Admin Edit' },
  delete: { href: '/admin/delete', label: 'Admin Delete' },
};

export const SPOTIFY_URL = 'https://open.spotify.com/search';
