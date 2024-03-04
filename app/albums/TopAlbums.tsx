'use client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

import { formatFavorites, sortDesc } from 'utils';
import { SPOTIFY_URL } from 'utils/constants';
import { Album } from 'utils/types';
import AppLayout from 'components/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { DecadeSelect } from 'components/DecadeSelect';
import { Badge } from 'components/ui/badge';

interface Props {
  albums: Album[];
}

export default function TopAlbums({ albums }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Top albums</span>
          <Badge variant="secondary">{albums.length.toLocaleString()}</Badge>
        </div>
      }
      titleAction={<DecadeSelect />}
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatFavorites(albums))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <Card key={year}>
              <CardHeader>
                <CardTitle id={year}>{year}</CardTitle>
                <CardDescription>
                  {favorites.length.toLocaleString()} album
                  {favorites.length > 1 && 's'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-4 list-disc space-y-1">
                  {favorites.map((f, index) => {
                    const query = encodeURI(`${f.artist} ${f.title}`);
                    const url = `${SPOTIFY_URL}/${query}`;

                    return (
                      <li key={index} className="text-sm">
                        <span className="text-muted-foreground">
                          {f.artist} &ndash;
                        </span>{' '}
                        <a
                          className="underline underline-offset-4 hover:text-muted-foreground"
                          href={url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {f.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}
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
