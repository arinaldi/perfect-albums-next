import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import useDelete from 'hooks/useDelete';
import useSubmit from 'hooks/useSubmit';
import { MESSAGES } from 'utils/constants';
import { Song } from 'utils/types';
import Modal from 'components/Modal';
import OutlineButton from 'components/OutlineButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  data: Song | null;
}

export default function DeleteSongModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const deleteSong = useDelete('songs');
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async () => {
      await deleteSong(data?.id || 0);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button className="cursor-pointer dark:text-white hover:text-gray-600 dark:hover:text-gray-200">
        <TrashIcon className="inline h-4 w-4" />
      </Modal.Button>
      <Modal.Content title="Delete Song">
        <form className="mt-6 dark:text-white" onSubmit={onSubmit}>
          <p>
            Are you sure you want to delete {data?.artist} &ndash; {data?.title}
            ?
          </p>
          <div className="flex items-center justify-end gap-2 mt-8">
            <OutlineButton onClick={() => setOpen(false)}>Cancel</OutlineButton>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
