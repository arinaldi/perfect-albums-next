import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'lib/dbConnect';
import { Release as ReleaseType } from 'utils/types';
import Release from 'models/Release';

export async function getReleases(): Promise<ReleaseType[]> {
  const data = await Release
    .find({})
    .sort({ date: 'asc', artist: 'asc', title: 'asc' });
  const releases = data.map(item => {
    const { _id, artist, date, title } = item.toObject();
    return {
      artist,
      date: date ? date.toISOString() : null,
      id: _id.toString(),
      title,
    };
  });

  return releases;
}

export default async function(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await dbConnect();

  try {
    const releases = await getReleases();
    res.status(200).json({ success: true, releases });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
