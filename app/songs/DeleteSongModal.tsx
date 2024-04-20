import { FormEvent } from 'react';

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
import SubmitButton from 'components/SubmitButton';
import { deleteSong } from './actions';

interface Props {
  onOpenChange: (open: boolean) => void;
  onSelect: () => void;
  song: Song;
}

export default function DeleteSongModal({
  onOpenChange,
  onSelect,
  song,
}: Props) {
  const isDesktop = useMediaQuery();
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => onOpenChange(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const result = await deleteSong(song.id);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
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
            Delete
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <form className="space-y-8" onSubmit={onSubmit}>
            <DialogHeader className="text-left">
              <DialogTitle>Delete song</DialogTitle>
              <DialogDescription>Are you sure?</DialogDescription>
            </DialogHeader>
            <p className="text-sm">
              {song.artist} &ndash; {song.title}
            </p>
            <SubmitButton submitting={isSubmitting} variant="destructive" />
          </form>
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
          Delete
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={onSubmit}>
          <DrawerHeader className="text-left">
            <DrawerTitle>Delete song</DrawerTitle>
            <DrawerDescription>Are you sure?</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-8 px-4">
            <p className="text-sm">
              {song.artist} &ndash; {song.title}
            </p>
            <SubmitButton
              className="w-full"
              size="lg"
              submitting={isSubmitting}
              variant="destructive"
            />
          </div>
        </form>
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
