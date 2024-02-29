/* ENUM */

export enum MESSAGES {
  ALBUM_PREFIX = 'Album successfully',
  SONG_PREFIX = 'Song successfully',
  RELEASE_PREFIX = 'Release successfully',
  SIGNIN = 'Invalid username or password',
  ERROR = 'Something went wrong',
  NO_DATA = 'No Data',
  NOT_AUTHORIZED = 'Not authorized',
  INVALID_DATA = 'Invalid data',
}

export enum PER_PAGE {
  SMALL = 10,
  MEDIUM = 25,
  LARGE = 50,
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

export const DEBOUNCE_IN_MS = 500;

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
  { href: ROUTE_HREF.TOP_ALBUMS, label: 'Top albums' },
  { href: ROUTE_HREF.FEATURED_SONGS, label: 'Featured songs' },
  { href: ROUTE_HREF.NEW_RELEASES, label: 'New releases' },
];

export const ROUTES_ADMIN = {
  add: { href: '/admin/add', label: 'Admin add' },
  base: { href: '/admin', label: 'Admin' },
  edit: { href: '/admin/edit', label: 'Admin edit' },
  delete: { href: '/admin/delete', label: 'Admin delete' },
};

export const SPOTIFY_URL = 'https://open.spotify.com/search';
