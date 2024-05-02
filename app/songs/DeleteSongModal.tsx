import { forwardRef, FormEvent, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
      <TrashIcon className="size-4" />
      Delete
    </DropdownMenuItem>
  );
});

Trigger.displayName = 'Trigger';

export default function DeleteSongModal({ onClose, song }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false), onClose],
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trigger />
        </DialogTrigger>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete {song.artist} &ndash;{' '}
                {song.title}?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <SubmitButton submitting={isSubmitting} variant="destructive" />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Trigger />
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={onSubmit}>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              Are you sure you want to delete {song.artist} &ndash; {song.title}
              ?
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-8 px-4">
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
