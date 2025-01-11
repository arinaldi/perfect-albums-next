import { Fragment } from 'react';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SPOTIFY_URL } from 'utils/constants';
import { AllTimeListItem } from './edit/EditAllTimeRankings';
import EditButton from './EditButton';

interface Props {
  favorites: AllTimeListItem[];
}

export default function AllTimeRankings({ favorites }: Props) {
  return (
    <AppLayout
      className="max-w-md"
      title={
        <div className="flex items-center gap-2">
          <span>All-time albums</span>
          <Badge variant="secondary">{favorites.length.toLocaleString()}</Badge>
        </div>
      }
      titleAction={<EditButton />}
    >
      <p className="text-sm">
        These are the albums I revisit often or have a deep personal meaning.
        They shaped my musical tastes and changed the way I think about music.
      </p>
      <Card className="mt-2">
        <CardContent className="pt-6">
          <ol className="ml-4 list-decimal">
            {favorites.map((f, index) => {
              const query = encodeURI(`${f.artist} ${f.title}`);
              const url = `${SPOTIFY_URL}/${query}`;

              return (
                <Fragment key={f.id}>
                  <li
                    className={cn(
                      'text-sm text-muted-foreground',
                      index > 0 && 'mt-1',
                    )}
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
                  {(index + 1) % 10 === 0 && favorites[index + 1] && (
                    <Separator className="my-4" />
                  )}
                </Fragment>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
