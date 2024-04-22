import { type User } from '@supabase/supabase-js';

import { cn } from '@/lib/utils';
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
      <div className="grid grid-flow-row-dense grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:grid-cols-3">
        {Object.entries(data).map(([letter, songs]) => {
          if (songs.length === 0) return null;

          return (
            <div
              className={cn(
                letter < 'N' ? 'md:col-start-1' : '',
                letter >= 'N' ? 'md:col-start-2' : '',
                letter < 'J' ? 'lg:col-start-1' : '',
                letter >= 'J' ? 'lg:col-start-2' : '',
                letter >= 'S' ? 'lg:col-start-3' : '',
              )}
              key={letter}
            >
              <h2 className="border-b pb-2 text-xl font-semibold tracking-tight">
                {letter}
              </h2>
              <ul className="mt-2 space-y-6">
                {songs.map((s) => (
                  <li key={s.id} className="">
                    <div className="flex items-start justify-between gap-2">
                      <a
                        className="font-semibold leading-6 tracking-tight underline underline-offset-4 hover:text-muted-foreground"
                        href={s.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.title}
                      </a>
                      {user && <SongActions song={s} />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {s.artist}
                    </p>
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
