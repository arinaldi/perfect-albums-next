'use client';
import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Reorder } from 'framer-motion';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/SubmitButton';
import { useSubmit } from '@/hooks/submit';
import { ListItem, parseQuery } from '@/utils';
import { ROUTE_HREF } from '@/utils/constants';
import { editRankings } from '../actions';
import AlbumCard from './AlbumCard';

interface Props {
  favorites: ListItem[];
}

export default function EditRankings({ favorites }: Props) {
  const params = useParams();
  const router = useRouter();
  const year = parseQuery(params?.year);
  const [items, setItems] = useState(
    favorites.sort((a, b) => {
      if (a.ranking > b.ranking) return 1;
      if (a.ranking < b.ranking) return -1;
      return 0;
    }),
  );

  function goBack() {
    router.push(`${ROUTE_HREF.TOP_ALBUMS}#${year}`);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [goBack],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const rankings = items.map((item, index) => ({
        id: item.id,
        position: index + 1,
      }));
      const result = await editRankings(rankings, year);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: 'Rankings successfully edited',
  });

  return (
    <AppLayout
      className="max-w-md"
      title={
        <div className="flex items-center gap-2">
          <span>Rankings for {year}</span>
          <Badge variant="secondary">{favorites.length.toLocaleString()}</Badge>
        </div>
      }
    >
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
    </AppLayout>
  );
}
