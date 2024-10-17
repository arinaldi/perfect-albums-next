'use client';
import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { useSubmit } from '@/hooks/submit';
import { ListItem, parseQuery } from '@/utils';
import { ROUTE_HREF } from '@/utils/constants';
import { editRankings } from '../actions';

interface Props {
  favorites: ListItem[];
}

interface AlbumInput {
  albumId: number;
  artist: string;
  ranking: string;
  title: string;
}

interface FormInput {
  albums: AlbumInput[];
}

type InputName = `albums.${number}.ranking`;

export default function EditRankings({ favorites }: Props) {
  const params = useParams();
  const router = useRouter();
  const year = parseQuery(params?.year);
  // TODO: use schema
  const form = useForm<FormInput>({
    defaultValues: {
      albums: favorites
        .sort((a, b) => {
          if (a.ranking > b.ranking) return 1;
          if (a.ranking < b.ranking) return -1;
          return 0;
        })
        .map((f) => ({
          albumId: f.id,
          artist: f.artist,
          ranking: f.ranking?.toString() ?? '0',
          title: f.title,
        })),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: 'albums',
  });

  function onDecrement(name: InputName) {
    const value = form.watch(name);
    const newValue = parseInt(value) - 1;

    form.setValue(name, newValue.toString());
  }

  function onIncrement(name: InputName) {
    const value = form.watch(name);
    const newValue = parseInt(value) + 1;

    form.setValue(name, newValue.toString());
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => router.push(`${ROUTE_HREF.TOP_ALBUMS}#${year}`)],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: FormInput) => {
      const rankings = data.albums.map((a) => ({
        id: a.albumId,
        position: Number(a.ranking),
      }));
      const positions = rankings.map((r) => r.position);
      const positionsSet = new Set(positions);

      if (positionsSet.size !== favorites.length) {
        throw new Error('Rankings must be unique: client');
      }

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
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          {fields.map((field, index) => {
            const name: InputName = `albums.${index}.ranking`;

            return (
              <FormField
                control={form.control}
                key={`${field.artist}-${field.title}`}
                name={name}
                render={({ field: f }) => (
                  <FormItem className="flex items-center justify-between gap-4 space-y-0">
                    <div>
                      <FormLabel>{field.title}</FormLabel>
                      <FormDescription>{field.artist}</FormDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        className="shrink-0"
                        disabled={parseInt(form.watch(name)) <= 1}
                        onClick={() => onDecrement(name)}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <MinusIcon className="size-4" />
                      </Button>
                      <FormControl>
                        <Input
                          {...f}
                          inputMode="numeric"
                          min={1}
                          max={99}
                          maxLength={2}
                          type="number"
                          required
                        />
                      </FormControl>
                      <Button
                        className="shrink-0"
                        disabled={
                          parseInt(form.watch(name)) >= favorites.length
                        }
                        onClick={() => onIncrement(name)}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
            Save
          </SubmitButton>
        </form>
      </Form>
    </AppLayout>
  );
}
