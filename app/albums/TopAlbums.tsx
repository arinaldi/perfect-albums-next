import Link from 'next/link';
import { ArrowUpIcon } from 'lucide-react';

import { capitalizeFirstLetter, type FavoriteResults } from 'utils';
import { SPOTIFY_URL } from 'utils/constants';
import AppLayout from 'components/AppLayout';
import { Badge } from 'components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { DecadeSelect } from 'components/DecadeSelect';
import RankingLink from './RankingLink';

interface Props {
  count: number;
  favorites: FavoriteResults;
}

export default function TopAlbums({ count, favorites }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span className="text-nowrap">Top albums</span>
          <Badge variant="secondary">{count.toLocaleString()}</Badge>
        </div>
      }
      titleAction={
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground"
            href="/albums/all-time"
          >
            All-time list
          </Link>
          <DecadeSelect />
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Object.entries(favorites)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([year, favorites]) => (
            <Card key={year}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle id={year}>{capitalizeFirstLetter(year)}</CardTitle>
                  <RankingLink year={year} />
                </div>
                <CardDescription>
                  {favorites.length.toLocaleString()} album
                  {favorites.length > 1 && 's'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="ml-4 list-decimal space-y-1">
                  {favorites
                    .sort((a, b) => {
                      if (a.ranking > b.ranking) return 1;
                      if (a.ranking < b.ranking) return -1;
                      return 0;
                    })
                    .map((f, index) => {
                      const query = encodeURI(`${f.artist} ${f.title}`);
                      const url = `${SPOTIFY_URL}/${query}`;

                      return (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          <span>{f.artist} &ndash;</span>{' '}
                          <a
                            className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {f.title}
                          </a>
                        </li>
                      );
                    })}
                </ol>
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
