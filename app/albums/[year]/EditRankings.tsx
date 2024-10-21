'use client';
import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SubmitButton from '@/components/SubmitButton';
import { useSubmit } from '@/hooks/submit';
import { cn } from '@/lib/utils';
import { ListItem, parseQuery } from '@/utils';
import { ROUTE_HREF } from '@/utils/constants';
import { editRankings } from '../actions';

interface Props {
  favorites: ListItem[];
}

function reorder(list: ListItem[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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

  function onDragEnd(result: DropResult<string>) {
    if (!result.destination) return;

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => router.push(`${ROUTE_HREF.TOP_ALBUMS}#${year}`)],
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
      className="max-w-sm"
      title={
        <div className="flex items-center gap-2">
          <span>Rankings for {year}</span>
          <Badge variant="secondary">{favorites.length.toLocaleString()}</Badge>
        </div>
      }
    >
      <form onSubmit={onSubmit}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="space-y-2"
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable
                    draggableId={item.id.toString()}
                    index={index}
                    key={item.id}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          snapshot.isDragging ? 'bg-primary-foreground' : '',
                        )}
                      >
                        <CardHeader className="px-4 py-3">
                          <CardTitle className="flex justify-between gap-4">
                            <span className="font-medium">
                              {index + 1}. {item.title}
                            </span>
                            <DragHandleDots2Icon className="size-4" />
                          </CardTitle>
                          <CardDescription>{item.artist}</CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <SubmitButton className="mt-4 w-full sm:w-auto" submitting={submitting}>
          Save
        </SubmitButton>
      </form>
    </AppLayout>
  );
}
