'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from 'hooks/useSubmit';
import { MESSAGES } from 'utils/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { songSchema, type SongInput } from './schema';
import { createSong } from './actions';

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function CreateSongModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<SongInput>({
    defaultValues,
    resolver: zodResolver(songSchema),
  });

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: createSong,
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add song</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add song</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <Input autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              className="mt-6 w-full sm:w-auto"
              submitting={isSubmitting}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
