import { Song as SongType, SongData } from 'utils/types';

export default function formatSong(data: SongData): SongType {
  const { _id, artist, link, title } = data.toObject();

  return {
    artist,
    id: _id.toString(),
    link,
    title,
  };
}
