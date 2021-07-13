import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from 'lib/dbConnect';
import formatRelease from 'lib/formatRelease';
import { Release as ReleaseType, ReleaseData } from 'utils/types';
import Release from 'models/Release';
import auth from 'middleware/auth';

export async function getReleases(): Promise<ReleaseType[]> {
  const data = await Release.find({}).sort({
    date: 'asc',
    artist: 'asc',
    title: 'asc',
  });
  const releases = data.map((item: ReleaseData) => {
    return formatRelease(item);
  });

  return releases;
}

const handler = nextConnect();

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      const releases = await getReleases();
      res.status(200).json({ success: true, releases });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .use(auth)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      const release = await Release.create(req.body);
      res.status(200).json({ success: true, release });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const { id, ...data } = req.body;

    try {
      const release = await Release.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json({ success: true, release });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      await Release.findByIdAndDelete(req.body.id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
