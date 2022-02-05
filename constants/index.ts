export enum PER_PAGE {
  SMALL = 25,
  MEDIUM = 50,
  LARGE = 100,
}

export enum SORT_VALUE {
  ARTIST = 'artist',
  NONE = '',
  TITLE = 'title',
  YEAR = 'year',
}

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
  NONE = '',
}

export enum MESSAGES {
  ALBUM_PREFIX = 'Album successfully',
  SONG_PREFIX = 'Song successfully',
  RELEASE_PREFIX = 'Release successfully',
  UNAUTHORIZED = 'You are unauthorized to perform this operation',
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

export const modalInitialState = {
  data: null,
  type: MODAL_TYPES.INITIAL,
};

export enum APP_MESSAGE_TYPES {
  ERROR = 'error',
  INFO = 'info',
}

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

export enum ROUTE_HREF {
  TOP_ALBUMS = '/top-albums',
  FEATURED_SONGS = '/featured-songs',
  NEW_RELEASES = '/new-releases',
  SIGNIN = '/signin',
}

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
