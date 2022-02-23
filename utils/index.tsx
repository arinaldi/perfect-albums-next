import { ReactNode } from 'react';
import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
} from '@heroicons/react/outline';

import { MONTHS, PER_PAGE, SORT_DIRECTION } from 'constants/index';
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

interface ReleaseResults {
  [key: string]: Release[];
}

export function formatReleases(releases: Release[]): ReleaseResults {
  const results: ReleaseResults = {};

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
    return <ArrowNarrowUpIcon className="mr-1 inline h-4 w-4" />;
  if (direction === DESC)
    return <ArrowNarrowDownIcon className="mr-1 inline h-4 w-4" />;

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

export function getTitle(title: string): string {
  return `Perfect Albums | ${title}`;
}

export interface AlbumParams {
  artist: string;
  direction: string;
  page: number;
  perPage: PER_PAGE;
  sort: string;
  studio: boolean;
  title: string;
}

export function generateAlbumsUrl({
  artist,
  direction,
  page,
  perPage,
  sort,
  studio,
  title,
}: AlbumParams) {
  return `/api/albums?page=${page}&per_page=${perPage}&artist=${artist}&title=${title}&sort=${sort}&direction=${direction}&studio=${
    studio ? 'true' : ''
  }`;
}
