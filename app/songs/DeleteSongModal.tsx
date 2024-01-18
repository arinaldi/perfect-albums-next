'use client';
import { FormEvent, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useSubmit } from 'hooks/useSubmit';
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
  const { isSubmitting, onSubmit } = useSubmit({
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
      <Modal.Content title="Delete song">
        <form className="mt-6 dark:text-white" onSubmit={onSubmit}>
          <p>
            Are you sure you want to delete {data.artist} &ndash; {data.title}?
          </p>
          <Modal.Footer>
            <PrimaryButton isSubmitting={isSubmitting} />
            <Modal.Button asChild>
              <SecondaryButton />
            </Modal.Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
