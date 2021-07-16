import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'lib/dbConnect';
import Album from 'models/Album';

export async function getCdCount(): Promise<number> {
  const albums = await Album.find({ cd: true }).sort({});

  return albums.length;
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await dbConnect();

  try {
    const count = await getCdCount();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
