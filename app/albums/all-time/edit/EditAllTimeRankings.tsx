'use client';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reorder } from 'framer-motion';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/SubmitButton';
import { useSubmit } from '@/hooks/submit';
import { ListItem, parseQuery } from '@/utils';
import { ROUTE_HREF } from '@/utils/constants';
import DataEmptyPlaceholder from '@/app/admin/DataEmptyPlaceholder';
import Search from '@/app/admin/Search';
import AlbumCard from '../../[year]/AlbumCard';
import { editAllTimeRankings } from './actions';

export interface AllTimeListItem extends ListItem {
  allTimeRanking: number | null;
}

interface Props {
  candidates: AllTimeListItem[];
  favorites: AllTimeListItem[];
}

export default function EditAllTimeRankings({ candidates, favorites }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = parseQuery(searchParams.get('title'));
  const [items, setItems] = useState(favorites);

  function goBack() {
    router.push(`${ROUTE_HREF.TOP_ALBUMS}/all-time`);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [goBack],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const rankings = items.map((item, index) => ({
        ['all_time_position']: index + 1,
        id: item.id,
        position: item.ranking,
        year: item.year,
      }));
      const result = await editAllTimeRankings(rankings);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: 'Rankings successfully edited',
  });

  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>All-time rankings</span>
          <Badge variant="secondary">{favorites.length.toLocaleString()}</Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
        <div>
          <Search autoFocus type="title" />
          {candidates.length === 0 && title && (
            <div className="mt-4 flex justify-center">
              <DataEmptyPlaceholder />
            </div>
          )}
          {candidates.length > 0 && (
            <div className="mt-4 space-y-3 rounded-md border p-4">
              {candidates.map((c) => (
                <div
                  className="flex items-start justify-between gap-2"
                  key={c.id}
                >
                  <div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-sm text-muted-foreground">{c.artist}</p>
                    <p className="text-xs text-muted-foreground">{c.year}</p>
                  </div>
                  <Button
                    disabled={items.some((i) => i.id === c.id)}
                    onClick={() => {
                      setItems((prev) => [...prev, c]);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Reorder.Group axis="y" onReorder={setItems} values={items}>
            <div className="space-y-2">
              {items.map((item, index) => (
                <AlbumCard key={item.id} item={item} position={index + 1} />
              ))}
            </div>
          </Reorder.Group>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
              Save
            </SubmitButton>
            <Button
              className="w-full sm:w-auto"
              onClick={goBack}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
