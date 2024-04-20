import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useMediaQuery } from '@/hooks/media-query';
import { songSchema, type SongInput } from './schema';
import { editSong } from './actions';
import SongForm from './SongForm';

interface Props {
  onOpenChange: (open: boolean) => void;
  onSelect: () => void;
  song: Song;
}

export default function EditSongModal({ onOpenChange, onSelect, song }: Props) {
  const isDesktop = useMediaQuery();
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
    callbacks: [() => onOpenChange(false)],
    handleSubmit,
    submitFn: async (data: SongInput) => {
      const result = await editSong(song.id, data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} edited`,
  });

  if (isDesktop) {
    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            Edit
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Edit song</DialogTitle>
            <DialogDescription>Update data for featured song</DialogDescription>
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
    <Drawer onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          Edit
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit song</DrawerTitle>
          <DrawerDescription>Update data for featured song</DrawerDescription>
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
