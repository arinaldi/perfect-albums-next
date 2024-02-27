import { type User } from '@supabase/supabase-js';

import { Song } from 'utils/types';
import AppLayout from 'components/AppLayout';
import { Badge } from 'components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import CreateSongModal from './CreateSongModal';
import DeleteSongModal from './DeleteSongModal';

interface Props {
  songs: Song[];
  user: User | null;
}

export default function FeaturedSongs({ songs, user }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Featured songs</span>
          <Badge variant="secondary">{songs.length.toLocaleString()}</Badge>
        </div>
      }
      titleAction={user && <CreateSongModal />}
    >
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <Card key={song.id}>
            <CardHeader>
              <CardTitle className="flex justify-between gap-2 text-xl">
                <a
                  className="text-muted-foreground underline underline-offset-4 hover:text-primary"
                  href={song.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {song.title}
                </a>
                {user && <DeleteSongModal data={song} />}
              </CardTitle>
              <CardDescription>{song.artist}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
