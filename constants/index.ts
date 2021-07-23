export enum PER_PAGE {
  twentyFive = 25,
  fifty = 50,
  oneHundred = 100,
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

export enum DISPATCH_TYPES {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
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

export const ROUTES = [
  { href: '/top-albums', label: 'Top Albums' },
  { href: '/featured-songs', label: 'Featured Songs' },
  { href: '/new-releases', label: 'New Releases' },
];

export const ROUTES_ADMIN = {
  base: { href: '/admin', label: 'Admin' },
  create: { href: '/admin/create', label: 'Admin Create' },
  edit: { href: '/admin/edit', label: 'Admin Edit' },
  delete: { href: '/admin/delete', label: 'Admin Delete' },
};
