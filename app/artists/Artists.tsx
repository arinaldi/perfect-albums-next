'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { type User } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MESSAGES } from '@/utils/constants';
import Random from './Random';
import {
  Result,
  getAccessToken,
  getArtistAlbums,
  getArtistId,
} from './actions';

interface Props {
  artists: string[];
  user: User | null;
}

interface State {
  artist: string;
  data: Result[];
  token: string;
}

export default function Artists({ artists, user }: Props) {
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState<State>({
    artist: '',
    data: [],
    token: '',
  });

  async function fetchResults(artist: string) {
    let { token } = results;
    setFetching(true);

    try {
      if (!token) {
        token = await getAccessToken();

        if (!token) {
          throw new Error(MESSAGES.ERROR);
        }
      }

      const artistId = await getArtistId(token, artist);

      if (!artistId) {
        throw new Error(MESSAGES.ERROR);
      }

      const data = await getArtistAlbums(token, artistId);

      if (!data) {
        throw new Error(MESSAGES.ERROR);
      }

      setResults({
        artist,
        data: data.sort(sortByDateDesc),
        token,
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : MESSAGES.ERROR;

      toast.error(message);
    }

    setFetching(false);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row md:gap-8">
      <ScrollArea className="h-[450px] shrink-0 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium italic leading-none">
            {artists.length.toLocaleString()} artists
          </h4>
          {artists.map((a, index) => {
            if (user) {
              return (
                <div key={a}>
                  <Button
                    className="block size-auto p-0 text-sm font-normal"
                    disabled={fetching}
                    onClick={() => fetchResults(a)}
                    size="sm"
                    variant="link"
                  >
                    {a}
                  </Button>
                  {index !== artists.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              );
            }

            return (
              <div key={a}>
                <p className="text-sm">{a}</p>
                {index !== artists.length - 1 && <Separator className="my-2" />}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-4">
        <Random artists={artists} />
        {results.data.length > 0 && (
          <>
            <h4 className="text-sm font-medium italic leading-none">
              {results.artist}
            </h4>
            <ul className="ml-3 list-disc space-y-2">
              {results.data.map((item) => (
                <li className="space-y-1 text-sm" key={item.id}>
                  <a
                    className="block underline underline-offset-4 hover:text-muted-foreground"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.name}
                  </a>
                  <p className="text-muted-foreground">
                    {item.date} &ndash;{' '}
                    <span
                      className={cn(
                        item.type === 'album' ? 'font-medium' : 'font-light',
                      )}
                    >
                      {item.type}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function sortByDateDesc(a: Result, b: Result) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}
