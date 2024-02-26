'use client';
import { FormEvent, useState } from 'react';
import { Trash2 } from 'lucide-react';

import { useSubmit } from 'hooks/useSubmit';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { SubmitButton } from 'components/ui/submit-button';
import { deleteSong } from './actions';

interface Props {
  data: Song;
}

export default function DeleteSongModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();
      await deleteSong(data.id);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-shrink-0" size="icon" variant="outline">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Delete song</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {data.artist} &ndash; {data.title}
              ?
            </DialogDescription>
          </DialogHeader>
          <SubmitButton
            className="mt-6 w-full sm:w-auto"
            submitting={isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
