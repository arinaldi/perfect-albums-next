import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from 'lib/dbConnect';
import { Song as SongType } from 'utils/types';
import Song from 'models/Song';
import auth from 'middleware/auth';

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

const handler = nextConnect();

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      const songs = await getSongs();
      res.status(200).json({ success: true, songs });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .use(auth)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      const song = await Song.create(req.body);
      res.status(200).json({ success: true, song });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      await Song.findByIdAndDelete(req.body.id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
