'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/media-query';
import { songSchema, type SongInput } from './schema';
import { addSong } from './actions';
import SongForm from './SongForm';

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function AddSongModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();
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
    submitFn: async (data: SongInput) => {
      const result = await addSong(data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} added`,
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add song</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Add song</DialogTitle>
            <DialogDescription>
              What&apos;s the next featured song?
            </DialogDescription>
          </DialogHeader>
          <SongForm
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Add song</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add song</DrawerTitle>
          <DrawerDescription>
            What&apos;s the next featured song?
          </DrawerDescription>
        </DrawerHeader>
        <SongForm
          className="px-4"
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button size="lg" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
