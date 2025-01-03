import { MONTHS, PER_PAGE } from 'utils/constants';
import { Album, Release, Song, StudioValue } from 'utils/types';

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
  allTimeRanking: number | null;
  artist: string;
  id: number;
  ranking: number;
  title: string;
  year: string;
}

export interface FavoriteResults {
  [key: string]: ListItem[];
}

interface RankedAlbum extends Album {
  ranking: {
    all_time_position: number | null;
    position: number;
  } | null;
}

export function formatFavorites(favorites: RankedAlbum[]): FavoriteResults {
  const results: FavoriteResults = {
    ['all-time']: [],
  };

  favorites.forEach(({ artist, id, ranking, title, year }) => {
    const data = {
      allTimeRanking: ranking?.all_time_position ?? null,
      artist,
      id,
      ranking: ranking?.position ?? 0,
      title,
      year,
    };

    if (results[year]) {
      results[year].push(data);
    } else {
      results[year] = [data];
    }

    if (data.allTimeRanking !== null) {
      results['all-time'].push(data);
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

export interface ReleaseResults {
  [key: string]: Release[];
}

export function formatReleases(releases: Release[]): ReleaseResults {
  const results: ReleaseResults = {};

  releases.forEach((r) => {
    const releaseDate = r.date ? formatReleaseDate(r.date) : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(r);
    } else {
      results[releaseDate] = [r];
    }
  });

  return results;
}

export interface SongResults {
  [key: string]: Song[];
}

const NUMBER_SIGN = '#';
const ALPHABET = Array.from(Array(26)).map((_, i) =>
  String.fromCharCode(i + 65),
);
export const HEADER_LETTERS = [NUMBER_SIGN, ...ALPHABET];

export function formatSongs(songs: Song[]): SongResults {
  const results: SongResults = {};

  HEADER_LETTERS.forEach((letter) => {
    results[letter] = [];
  });

  songs.forEach((song) => {
    let firstLetter = song.artist[0].toUpperCase();

    if (song.artist.startsWith('A ')) {
      firstLetter = song.artist[2].toUpperCase();
    } else if (song.artist.startsWith('An ')) {
      firstLetter = song.artist[3].toUpperCase();
    } else if (
      song.artist.startsWith('The ') ||
      song.artist.startsWith('Tha ')
    ) {
      firstLetter = song.artist[4].toUpperCase();
    }

    if (/\d/.test(firstLetter) || !results[firstLetter]) {
      firstLetter = NUMBER_SIGN;
    }

    results[firstLetter].push(song);
  });

  Object.values(results).forEach((s) => {
    s.sort((a, b) => {
      let artistA = a.artist;
      let artistB = b.artist;

      if (artistA.startsWith('A ')) {
        artistA = artistA.slice(2);
      } else if (artistA.startsWith('An ')) {
        artistA = artistA.slice(3);
      } else if (artistA.startsWith('The ') || artistA.startsWith('Tha ')) {
        artistA = artistA.slice(4);
      }

      if (artistB.startsWith('A ')) {
        artistB = artistB.slice(2);
      } else if (artistB.startsWith('An ')) {
        artistB = artistB.slice(3);
      } else if (artistB.startsWith('The ') || artistB.startsWith('Tha ')) {
        artistB = artistB.slice(4);
      }

      return artistA.localeCompare(artistB);
    });
  });

  return results;
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

export function parseStudioQuery(value: QueryValue): StudioValue {
  return value === 'true' ? value : 'false';
}

export function parseAdminQuery(query: Record<string, QueryValue>) {
  return {
    artist: parseQuery(query.artist),
    page: parsePageQuery(query.page),
    perPage: parsePerPageQuery(query.perPage),
    sort: parseQuery(query.sort),
    studio: parseStudioQuery(query.studio),
    title: parseQuery(query.title),
  };
}

export function setStringAsInt(v: string) {
  return v === '' ? undefined : parseInt(v, 10);
}

export async function wait(ms = 0) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function capitalizeFirstLetter(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}
