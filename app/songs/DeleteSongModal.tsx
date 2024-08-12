import { FormEvent } from 'react';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubmitButton from 'components/SubmitButton';
import { deleteSong } from './actions';

interface Props {
  onClose: () => void;
  song: Song;
}

export default function DeleteSongModal({ onClose, song }: Props) {
  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const result = await deleteSong(song.id);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete {song.artist} &ndash; {song.title}?
        </DialogTitle>
        <DialogDescription>This action cannot be undone</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <DialogFooter>
          <SubmitButton submitting={submitting} variant="destructive">
            Delete
          </SubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
