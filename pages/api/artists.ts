import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'utils/dbConnect';
import Album from 'models/Album';

async function getArtists(): Promise<string[]> {
  const artists = await Album.distinct('artist');

  return artists;
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await dbConnect();

  try {
    const artists = await getArtists();
    res.status(200).json({ success: true, artists });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
