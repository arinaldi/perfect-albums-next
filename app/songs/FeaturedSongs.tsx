import { type User } from '@supabase/supabase-js';

import { SongResults } from '@/utils';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import AddSongModal from './AddSongModal';
import SongActions from './SongActions';

interface Props {
  count: number;
  data: SongResults;
  user: User | null;
}

export default function FeaturedSongs({ count, data, user }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Featured songs</span>
          <Badge variant="secondary">{count.toLocaleString()}</Badge>
        </div>
      }
      titleAction={user && <AddSongModal />}
    >
      <div className="flex flex-col gap-8">
        {Object.entries(data).map(([letter, songs]) => {
          if (songs.length === 0) return null;

          return (
            <div key={letter}>
              <h2 className="border-b pb-2 text-xl font-semibold tracking-tight">
                {letter}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {songs.map((s) => (
                  <li key={s.id} className="text-sm">
                    <span className="flex items-start gap-2">
                      <span>
                        <span className="text-muted-foreground">
                          {s.artist} &ndash;
                        </span>{' '}
                        <a
                          className="underline underline-offset-4 hover:text-muted-foreground"
                          href={s.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {s.title}
                        </a>
                      </span>
                      {user && <SongActions song={s} />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
