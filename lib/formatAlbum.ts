import { Album as AlbumType, AlbumData } from 'utils/types';

export default function formatAlbum(data: AlbumData): AlbumType {
  const { _id, aotd, artist, cd, favorite, studio, title, updatedAt, year } =
    data.toObject();

  return {
    aotd,
    artist,
    cd,
    favorite,
    id: _id.toString(),
    studio,
    title,
    updatedAt: updatedAt ? updatedAt.toISOString() : '',
    year,
  };
}
