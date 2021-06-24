import { Favorite, AlbumData } from 'utils/types';

export default function formatFavorite(data: AlbumData): Favorite {
  const {
    artist,
    title,
    year,
  } = data.toObject();

  return {
    artist,
    title,
    year,
  };
}
