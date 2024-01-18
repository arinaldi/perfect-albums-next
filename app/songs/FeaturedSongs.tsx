import { type Session } from '@supabase/supabase-js';

import { Song } from 'utils/types';
import AppLayout from 'components/AppLayout';
import Badge from 'components/Badge';
import CreateSongModal from 'app/songs/CreateSongModal';
import DeleteSongModal from 'app/songs/DeleteSongModal';

interface Props {
  session: Session | null;
  songs: Song[];
}

export default function FeaturedSongs({ session, songs }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Featured songs</span>
          <Badge label={songs.length.toLocaleString()} />
        </div>
      }
      titleAction={session && <CreateSongModal />}
    >
      <dl className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <div
            className="rounded-md border border-gray-200 bg-white px-5 py-3 shadow-sm dark:border-gray-900 dark:bg-gray-700"
            key={song.id}
          >
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-700 dark:text-white">
                {song.artist}
              </dt>
              {session && <DeleteSongModal data={song} />}
            </div>
            <a
              className="text-blue-700 underline decoration-dotted dark:text-blue-500"
              href={song.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <dd className="-mt-1 text-lg font-medium">{song.title}</dd>
            </a>
          </div>
        ))}
      </dl>
    </AppLayout>
  );
}
