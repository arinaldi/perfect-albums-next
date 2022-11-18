'use client';

import { MESSAGES } from 'utils/constants';
import useDelete from 'hooks/useDelete';
import useSubmit from 'hooks/useSubmit';
import { Song } from 'utils/types';
import Modal from 'components/Modal';

interface Props {
  data: Song | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteSongModal({ data, isOpen, onClose }: Props) {
  const deleteSong = useDelete('songs');

  const options = {
    callbacks: [onClose],
    submitFn: async () => {
      await deleteSong(data?.id || 0);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Delete Song"
    >
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 dark:text-white">
            Are you sure you want to delete {data?.artist} &ndash; {data?.title}
            ?
          </div>
        </div>
      </div>
    </Modal>
  );
}
