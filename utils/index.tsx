import { ReactNode } from 'react';

import { MONTHS, SORT_DIRECTION, SORT_VALUE } from 'constants/index';
import { Favorite, Release } from 'utils/types';
import { ArrowDownIcon, ArrowUpIcon } from 'components/Icons';

function addZeroPrefix(value: number) {
  return value < 10 ? `0${value}` : value;
}

export function formatDate(isoString: string): string {
  if (!isoString) return '';

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addZeroPrefix(month)}-${addZeroPrefix(day)}`;
}

export interface ListItem {
  artist: string;
  title: string;
  id?: string;
}

interface Results {
  [key: string]: ListItem[];
}

type Tuple = [string, ListItem[]];

export function formatFavorites(favorites: Favorite[]): Results {
  const results: Results = {};

  favorites.forEach(({ artist, title, year }) => {
    const data = { artist, title };

    if (results[year]) {
      results[year].push(data);
    } else {
      results[year] = [data];
    }
  });

  return results;
}

function formatReleaseDate(isoString: string) {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
}

export function formatReleases(releases: Release[]): Results {
  const results: Results = {};

  releases.forEach((release) => {
    const releaseDate = release.date ? formatReleaseDate(release.date) : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(release);
    } else {
      results[releaseDate] = [release];
    }
  });

  return results;
}

export function getSortIcon(direction: SORT_DIRECTION): ReactNode {
  const { ASC, DESC } = SORT_DIRECTION;

  if (!direction) return null;
  if (direction === ASC) return <ArrowUpIcon />;
  if (direction === DESC) return <ArrowDownIcon />;

  return null;
}

export function sortByDate(a: Tuple, b: Tuple): number {
  const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
  const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

export function sortDesc(a: Tuple, b: Tuple): number {
  return Number(b[0]) - Number(a[0]);
}

type QueryValue = string | string[] | undefined;

export function parseQuery(value: QueryValue): string {
  return typeof value === 'string' ? value : '';
}

export function parseDirectionQuery(value: QueryValue): SORT_DIRECTION {
  const { ASC, DESC, NONE } = SORT_DIRECTION;

  if (value === ASC) return ASC;
  if (value === DESC) return DESC;
  return NONE;
}

export function parseSortQuery(value: QueryValue): SORT_VALUE {
  const { ARTIST, TITLE, YEAR, NONE } = SORT_VALUE;

  if (value === ARTIST) return ARTIST;
  if (value === TITLE) return TITLE;
  if (value === YEAR) return YEAR;
  return NONE;
}
