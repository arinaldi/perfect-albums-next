import { CalendarIcon, LayersIcon, UserIcon, Volume1Icon } from 'lucide-react';

/* ENUM */

export enum MESSAGES {
  ALBUM_PREFIX = 'Album successfully',
  SONG_PREFIX = 'Song successfully',
  RELEASE_PREFIX = 'Release successfully',
  ERROR = 'Something went wrong',
  NO_DATA = 'No data',
  NOT_AUTHORIZED = 'Not authorized',
  INVALID_DATA = 'Invalid data',
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

export const ROUTE_HREF = {
  ARTISTS: '/artists',
  DASHBOARD: '/dashboard',
  FEATURED_SONGS: '/songs',
  NEW_RELEASES: '/releases',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
  TOP_ALBUMS: '/albums',
};

export const ROUTES = [
  {
    href: ROUTE_HREF.TOP_ALBUMS,
    icon: LayersIcon,
    label: 'Top albums',
  },
  {
    href: ROUTE_HREF.FEATURED_SONGS,
    icon: Volume1Icon,
    label: 'Featured songs',
  },
  {
    href: ROUTE_HREF.NEW_RELEASES,
    icon: CalendarIcon,
    label: 'New releases',
  },
  {
    href: ROUTE_HREF.ARTISTS,
    icon: UserIcon,
    label: 'Artists',
  },
];

export const ROUTES_ADMIN = {
  add: { href: '/admin/add', label: 'Add album' },
  base: { href: '/admin', label: 'Admin' },
  edit: { href: '/admin/edit', label: 'Edit album' },
  delete: { href: '/admin/delete', label: 'Delete album' },
};

export const SPOTIFY_URL = 'https://open.spotify.com/search';
