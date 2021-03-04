import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'lib/dbConnect';
import { Song as SongType } from 'utils/types';
import Song from 'models/Song';

export async function getSongs(): Promise<SongType[]> {
  const data = await Song
    .find({})
    .sort({ createdAt: 'desc' });
  const songs = data.map(item => {
    const { _id, artist, link, title } = item.toObject();
    return {
      artist,
      id: _id.toString(),
      link,
      title,
    };
  });

  return songs;
}

export default async function(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await dbConnect();

  try {
    const songs = await getSongs();
    res.status(200).json({ success: true, songs });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
