import { type User } from '@supabase/supabase-js';

import { Song } from '@/utils/types';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((s) => (
          <Card key={s.id} className="relative">
            <CardHeader>
              <CardTitle className="flex items-start justify-between gap-2">
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
              <CardContent>
                <span className="flex gap-2">
                  <EditSongModal song={s} />
                  <DeleteSongModal song={s} />
                </span>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
