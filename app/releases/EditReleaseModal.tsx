'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { useSubmit } from 'hooks/useSubmit';
import { formatDate } from 'utils';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import SubmitButton from 'components/SubmitButton';
import { releaseSchema, type ReleaseInput } from './schema';
import { editRelease } from './actions';

interface Props {
  data: Release;
}

export default function EditReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<ReleaseInput>({
    resolver: zodResolver(releaseSchema),
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!data) return;

    reset({
      artist: data.artist,
      title: data.title,
      date: data.date ? formatDate(data.date) : '',
    });
  }, [data, reset]);

  function onClose() {
    setOpen(false);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit,
    submitFn: editRelease.bind(null, data.id),
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-shrink-0" size="icon" variant="ghost">
          <Pencil1Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit release</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={onSubmit}>
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
              name="date"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              className="w-full sm:w-auto"
              submitting={isSubmitting}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
