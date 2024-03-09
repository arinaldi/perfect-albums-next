import { type User } from '@supabase/supabase-js';

import { Song } from '@/utils/types';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AddSongModal from './AddSongModal';
import DeleteSongModal from './DeleteSongModal';
import EditSongModal from './EditSongModal';

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
      titleAction={user && <AddSongModal />}
    >
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((s) => (
          <Card key={s.id} className="relative">
            <CardHeader>
              <CardTitle>
                <a
                  className="leading-6 underline underline-offset-4 hover:text-muted-foreground"
                  href={s.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {s.title}
                </a>
              </CardTitle>
              <CardDescription>{s.artist}</CardDescription>
            </CardHeader>
            {user && (
              <span className="absolute right-2 top-4 flex items-center gap-0.5">
                <EditSongModal song={s} />
                <DeleteSongModal song={s} />
              </span>
            )}
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
