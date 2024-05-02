import { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { songSchema, type SongInput } from './schema';
import { editSong } from './actions';
import SongForm from './SongForm';

interface Props {
  onClose: () => void;
  song: Song;
}

const Trigger = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onSelect={(event) => {
        event.preventDefault();
      }}
      ref={ref}
      {...props}
    >
      <Pencil1Icon className="size-4" />
      Edit
    </DropdownMenuItem>
  );
});

Trigger.displayName = 'Trigger';

export default function EditSongModal({ onClose, song }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<SongInput>({
    resolver: zodResolver(songSchema),
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!song) return;

    reset({
      artist: song.artist,
      title: song.title,
      link: song.link,
    });
  }, [reset, song]);

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false), onClose],
    handleSubmit,
    submitFn: async (data: SongInput) => {
      const result = await editSong(song.id, data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} edited`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trigger />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Edit song</DialogTitle>
          <DialogDescription>Update data for featured song</DialogDescription>
        </DialogHeader>
        <SongForm form={form} isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
