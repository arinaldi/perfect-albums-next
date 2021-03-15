import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from 'lib/dbConnect';
import formatAlbum from 'lib/formatAlbum';
import { Album as AlbumType, AlbumData } from 'utils/types';
import Album from 'models/Album';
import auth from 'middleware/auth';

interface Payload {
  albums: AlbumType[];
  count: number;
}

function parseQuery(query: string | string[]): string {
  return typeof query === 'string' ? query : query[0];
}

async function getAlbums(queries: NextApiRequest['query']): Promise<Payload> {
  return new Promise((resolve, reject) => {
    let {
      direction,
      page,
      per_page: perPage,
      search,
      sort,
    } = queries;
    direction = parseQuery(direction) || 'asc';
    page = parseQuery(page);
    perPage = parseQuery(perPage);
    sort = parseQuery(sort);
    const searchTerm = parseQuery(search);
    const regex = new RegExp(searchTerm, 'i');
    const pageNumber = (Math.abs(parseInt(page))) - 1;
    const limit = Math.abs(parseInt(perPage)) || 25;

    const query = Album.find({});

    if (searchTerm) {
      query.or([{ artist: regex }, { title: regex }]);
    }

    const sortParams = sort
      ? { [sort]: direction }
      : { artist: 'asc', title: 'asc' };

    if (sort === 'artist') {
      sortParams.title = 'asc';
    } else {
      sortParams.artist = direction;
    }

    query.countDocuments((_, count) => {
      query
        .sort(sortParams)
        .limit(limit)
        .skip(limit * pageNumber)
        // @ts-ignore
        .exec('find', (err: Error, data: AlbumData[]) => {
          if (err) reject(err);
          if (data) {
            const albums = data.map((item: AlbumData) => {
              return formatAlbum(item);
            });
            resolve({ count, albums });
          } else {
            resolve({ count: 0, albums: [] });
          }
        });
    });
  });
}

const handler = nextConnect();

handler
  .use(auth)
  .get('/api/albums', async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      const { albums, count } = await getAlbums(req.query);
      res.status(200).json({ success: true, albums, count });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .post('/api/albums', async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    try {
      const album = await Album.create(req.body);
      res.status(200).json({ success: true, album });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
