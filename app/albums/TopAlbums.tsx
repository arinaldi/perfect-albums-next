'use client';
import { ArrowUp } from 'lucide-react';

import { formatFavorites, sortDesc } from 'utils';
import { SPOTIFY_URL } from 'utils/constants';
import { Album } from 'utils/types';
import AppLayout from 'components/AppLayout';
import { DecadeSelect } from '@/components/DecadeSelect';
import { Badge } from '@/components/ui/badge';

interface Props {
  albums: Album[];
}

export default function TopAlbums({ albums }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Top albums</span>
          <Badge variant="outline">{albums.length.toLocaleString()}</Badge>
        </div>
      }
      titleAction={<DecadeSelect />}
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(formatFavorites(albums))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <div key={year}>
              <div className="flex items-center gap-2">
                <h4
                  id={year}
                  className="scroll-m-20 text-xl font-semibold tracking-tight"
                >
                  {year}
                </h4>
                <Badge variant="outline">
                  {favorites.length.toLocaleString()}
                </Badge>
              </div>
              <ul className="ml-6 list-disc p-1 [&>li]:mt-0.5">
                {favorites.map(({ artist, title }, index) => {
                  const query = encodeURI(`${artist} ${title}`);
                  const url = `${SPOTIFY_URL}/${query}`;

                  return (
                    <li key={index}>
                      {artist} &ndash;{' '}
                      <a
                        className="text-muted-foreground underline underline-offset-4 hover:text-primary"
                        href={url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>
      <a
        className="fixed bottom-0 right-0 p-5 text-sm text-muted-foreground"
        href="#top"
      >
        <ArrowUp className="mr-1 inline size-4" />
        <span>Top</span>
      </a>
    </AppLayout>
  );
}
