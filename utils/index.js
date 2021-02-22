import { MONTHS } from 'constants/index';

const addZeroPrefix = value => (value < 10 ? `0${value}` : value);

export const formatDate = isoString => {
  if (!isoString) return '';

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addZeroPrefix(month)}-${addZeroPrefix(day)}`;
};

export const formatFavorites = albums => {
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
};

const formatReleaseDate = isoString => {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
};

export const sortByDate = (a, b) => {
  const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
  const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
};

export const formatReleases = releases => {
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
};

export const sortDesc = (a, b) => b[0] - a[0];
