export const formatFavorites = (albums) => {
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

export const sortDesc = (a, b) => b[0] - a[0];
