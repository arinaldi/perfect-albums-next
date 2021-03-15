import nextConnect from 'next-connect';

import dbConnect from 'lib/dbConnect';
import { Album as AlbumType } from 'utils/types';
import Album from 'models/Album';
import auth from 'middleware/auth';

interface ExtendedRequest {
  body: {
    success: boolean;
    album: AlbumType;
  };
  query: {
    id: string;
  };
}

type Json = {
  json: (data: any) => void;
};

interface ExtendedResponse {
  status: (code: number) => Json;
}

const handler = nextConnect({ attachParams: true });

handler
  .use(auth)
  .put<ExtendedRequest, ExtendedResponse>(async (req, res) => {
    await dbConnect();

    try {
      const album = await Album.findByIdAndUpdate(req.query.id, req.body, { new: true });
      res.status(200).json({ success: true, album });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .delete<ExtendedRequest, ExtendedResponse>(async (req, res) => {
    await dbConnect();

    try {
      await Album.findByIdAndDelete(req.query.id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
