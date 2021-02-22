import { ICONS, MONTHS, SORT_DIRECTION } from 'constants/index';

function addZeroPrefix(value) {
  return value < 10 ? `0${value}` : value;
}

export function formatDate(isoString) {
  if (!isoString) return '';

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addZeroPrefix(month)}-${addZeroPrefix(day)}`;
}

export function formatFavorites(albums) {
  const results = {};

  albums.forEach(({ artist, title, year }) => {
    const album = { artist, title };

    if (results[year]) {
      results[year].push(album);
    } else {
      results[year] = [album];
    }
  });

  return results;
}

function formatReleaseDate(isoString) {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
}

export function formatReleases(releases) {
  const results = {};

  releases.forEach(release => {
    const releaseDate = release.date ? formatReleaseDate(release.date) : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(release);
    } else {
      results[releaseDate] = [release];
    }
  });

  return results;
}

export function getSortIcon(direction) {
  const { ASC, DESC } = SORT_DIRECTION;

  if (!direction) return '';
  if (direction === ASC) return `${ICONS.UP} `;
  if (direction === DESC) return `${ICONS.DOWN} `;
}

export function sortByDate(a, b) {
  const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
  const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

export function sortDesc(a, b) {
  return b[0] - a[0];
}
