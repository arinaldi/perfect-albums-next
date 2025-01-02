import { Fragment } from 'react';
import { ArrowUpIcon } from 'lucide-react';

import { HEADER_LETTERS, SongResults } from '@/utils';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import AddSongModal from './AddSongModal';
import SongActions from './SongActions';

interface Props {
  count: number;
  data: SongResults;
}

export default function FeaturedSongs({ count, data }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Featured songs</span>
          <Badge variant="secondary">{count.toLocaleString()}</Badge>
        </div>
      }
      titleAction={<AddSongModal />}
    >
      <div className="flex flex-wrap gap-1.5">
        {HEADER_LETTERS.map((l, index) => (
          <Fragment key={l}>
            <a
              className="underline underline-offset-4 hover:text-muted-foreground"
              key={l}
              href={`#letter-${l}`}
            >
              {l}
            </a>
            {index < HEADER_LETTERS.length - 1 && <span>&middot;</span>}
          </Fragment>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-8">
        {Object.entries(data).map(([letter, songs]) => {
          if (songs.length === 0) return null;

          return (
            <div key={letter}>
              <h2
                className="border-b pb-2 text-xl font-semibold tracking-tight"
                id={`letter-${letter}`}
              >
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
                      {<SongActions song={s} />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <a
        className="fixed bottom-0 right-0 p-5 text-sm text-muted-foreground"
        href="#top"
      >
        <ArrowUpIcon className="mr-1 inline size-4" />
        <span>Top</span>
      </a>
    </AppLayout>
  );
}
