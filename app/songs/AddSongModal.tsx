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
import { useUser } from '@/components/UserProvider';
import { songSchema, type SongInput } from './schema';
import { addSong } from './actions';
import SongForm from './SongForm';

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function AddSongModal() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const form = useForm<SongInput>({
    defaultValues,
    resolver: zodResolver(songSchema),
  });

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { onSubmit, submitting } = useSubmit({
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

  if (!user) return null;

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
        <SongForm form={form} onSubmit={onSubmit} submitting={submitting} />
      </DialogContent>
    </Dialog>
  );
}
