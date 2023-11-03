'use client';
import { FormEvent, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useServerAction } from 'hooks/useServerAction';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
import Modal from 'components/Modal';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import { deleteSong } from './actions';

interface Props {
  data: Song;
}

export default function DeleteSongModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const { isSubmitting, onSubmit } = useServerAction({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();
      await deleteSong(data.id);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button className="cursor-pointer hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
        <TrashIcon className="inline h-4 w-4" />
      </Modal.Button>
      <Modal.Content title="Delete Song">
        <form className="mt-6 dark:text-white" onSubmit={onSubmit}>
          <p>
            Are you sure you want to delete {data.artist} &ndash; {data.title}?
          </p>
          <div className="mt-8 flex items-center justify-end gap-2">
            <Modal.Button asChild>
              <SecondaryButton />
            </Modal.Button>
            <PrimaryButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
