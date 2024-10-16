import { ArrowUpIcon, SketchLogoIcon } from '@radix-ui/react-icons';

import { formatFavorites, sortDesc } from 'utils';
import { SPOTIFY_URL } from 'utils/constants';
import { Album } from 'utils/types';
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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Object.entries(formatFavorites(albums))
          .sort(sortDesc)
          .map(([year, favorites]) => {
            const best = favorites.find((f) => f.best);

            return (
              <Card key={year}>
                <CardHeader>
                  <CardTitle id={year}>{year}</CardTitle>
                  <CardDescription>
                    {favorites.length.toLocaleString()} album
                    {favorites.length > 1 && 's'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {best && (
                    <div className="mb-6 text-sm">
                      <SketchLogoIcon className="inline size-4" />
                      <span className="ml-1 text-muted-foreground">
                        {best.artist} &ndash;
                      </span>{' '}
                      <a
                        className="underline underline-offset-4 hover:text-muted-foreground"
                        href={`${SPOTIFY_URL}/${encodeURI(`${best.artist} ${best.title}`)}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {best.title}
                      </a>
                    </div>
                  )}
                  <ul className="ml-3 list-disc space-y-1">
                    {favorites
                      .filter((f) => !f.best)
                      .map((f, index) => {
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
