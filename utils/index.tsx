import { ReactNode } from 'react';
import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
} from '@heroicons/react/outline';

import { MONTHS, PER_PAGE, SORT_DIRECTION, SORT_VALUE } from 'constants/index';
import { Album, Release } from 'utils/types';

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
  id?: number;
}

interface Results {
  [key: string]: ListItem[];
}

type Tuple = [string, ListItem[]];

export function formatFavorites(favorites: Album[]): Results {
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
  if (direction === ASC)
    return <ArrowNarrowUpIcon className="inline w-4 h-4 mr-1" />;
  if (direction === DESC)
    return <ArrowNarrowDownIcon className="inline w-4 h-4 mr-1" />;

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

export function parsePageQuery(value: QueryValue): number {
  return typeof value === 'string' ? parseInt(value) : 1;
}

export function parsePerPageQuery(value: QueryValue): PER_PAGE {
  const { SMALL, MEDIUM, LARGE } = PER_PAGE;
  const perPage = typeof value === 'string' ? parseInt(value) : PER_PAGE.SMALL;

  if (perPage === SMALL) return SMALL;
  if (perPage === MEDIUM) return MEDIUM;
  if (perPage === LARGE) return LARGE;
  return SMALL;
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

export function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getTitle(title: string): string {
  return `Perfect Albums | ${title}`;
}
