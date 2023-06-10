import { twMerge } from 'tailwind-merge';

import { MONTHS, PER_PAGE } from 'utils/constants';
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
  artist: string | null;
  title: string | null;
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

    if (!year) return;

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
  page: number;
  perPage: PER_PAGE;
  sort: string;
  studio: string;
  title: string;
}

type QueryValue = string | string[] | undefined | null;

export function parseQuery(value: QueryValue) {
  return typeof value === 'string' ? value : '';
}

export function parsePageQuery(value: QueryValue) {
  return typeof value === 'string' ? parseInt(value) : 1;
}

export function parsePerPageQuery(value: QueryValue) {
  const { SMALL, MEDIUM, LARGE } = PER_PAGE;
  const perPage = typeof value === 'string' ? parseInt(value) : PER_PAGE.SMALL;

  if (perPage === SMALL) return SMALL;
  if (perPage === MEDIUM) return MEDIUM;
  if (perPage === LARGE) return LARGE;
  return SMALL;
}

export function parseAdminQuery(query: Record<string, QueryValue>) {
  return {
    artist: parseQuery(query.artist),
    page: parsePageQuery(query.page),
    perPage: parsePerPageQuery(query.perPage),
    sort: parseQuery(query.sort),
    studio: parseQuery(query.studio),
    title: parseQuery(query.title),
  };
}

export function setStringAsInt(v: string) {
  return v === '' ? undefined : parseInt(v, 10);
}

export function cn(...classes: string[]) {
  return twMerge(classes.filter(Boolean).join(' '));
}
