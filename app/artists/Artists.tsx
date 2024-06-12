'use client';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { type User } from '@supabase/supabase-js';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputClearButton from '@/components/InputClearButton';
import InputSpinner from '@/components/InputSpinner';
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
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState<State>({
    artist: '',
    data: [],
    token: '',
  });
  const filteredArtists = search
    ? artists.filter((a) => a.toLowerCase().includes(search.toLowerCase()))
    : artists;

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
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Artists</span>
          <Badge variant="secondary">
            {filteredArtists.length.toLocaleString()}
          </Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
        <div className="flex shrink-0 flex-col gap-4">
          <div className="relative">
            <Input
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              ref={searchRef}
              value={search}
            />
            {!fetching && search && (
              <InputClearButton
                onClick={() => {
                  setSearch('');
                  searchRef?.current?.focus();
                }}
              />
            )}
            {fetching && <InputSpinner />}
          </div>
          <ScrollArea className="max-h-[400px] rounded-md border sm:max-h-[800px]">
            <div className="p-4">
              {filteredArtists.map((a, index) => {
                if (user) {
                  return (
                    <div key={a}>
                      <Button
                        className={cn(
                          'block h-auto w-full px-0 py-0.5 text-left text-sm',
                          results.artist === a
                            ? 'font-semibold'
                            : 'font-normal',
                        )}
                        disabled={fetching}
                        onClick={() => fetchResults(a)}
                        size="sm"
                        variant="link"
                      >
                        {a}
                      </Button>
                      {index !== filteredArtists.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  );
                }
                return (
                  <div key={a}>
                    <p className="text-sm">{a}</p>
                    {index !== filteredArtists.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
        <div className="flex shrink-0 flex-col gap-4">
          <Random artists={artists} />
          {results.data.length > 0 && (
            <ScrollArea className="max-h-[400px] rounded-md border sm:max-h-[800px]">
              <div className="p-4">
                <ul className="space-y-4">
                  {results.data.map((item) => (
                    <li className="space-y-1 text-sm" key={item.id}>
                      <a
                        className={cn(
                          'block underline underline-offset-4 hover:text-muted-foreground',
                          item.type === 'album' ? 'font-medium' : 'font-light',
                        )}
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                      <p className="font-light text-muted-foreground">
                        {item.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function sortByDateDesc(a: Result, b: Result) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}
