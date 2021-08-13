import { NextApiRequest, NextApiResponse } from 'next';

import Album from 'models/Album';

export async function getAlbumIds(): Promise<string[]> {
  const ids = await Album.distinct('_id');

  return ids;
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  res.status(200).json({ success: true });
}
