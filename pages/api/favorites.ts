import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'lib/dbConnect';
import formatFavorite from 'lib/formatFavorite';
import { AlbumData, Favorite } from 'utils/types';
import Album from 'models/Album';

export async function getFavorites(): Promise<Favorite[]> {
  const albums = await Album.find({ favorite: true }).sort({
    year: 'desc',
    artist: 'asc',
    title: 'asc',
  });
  const favorites = albums.map((item: AlbumData) => {
    return formatFavorite(item);
  });

  return favorites;
}

export default async function favorites(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await dbConnect();

  try {
    const favorites = await getFavorites();
    res.status(200).json({ success: true, favorites });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
