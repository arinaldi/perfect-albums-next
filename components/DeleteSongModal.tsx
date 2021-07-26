import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES, METHODS } from 'constants/index';
import { fetcher } from 'utils/api';
import useStore from 'hooks/useStore';
import Modal from 'components/Modal';

const DeleteSongModal: FC = () => {
  const data = useStore((state) => state.data);
  const isOpen = useStore((state) => state.isOpen);
  const key = isOpen ? '/api/songs' : null;
  const { mutate } = useSWR(key, fetcher);
  const options = {
    body: { id: data.id },
    callbacks: [mutate],
    method: METHODS.DELETE,
    path: '/api/songs',
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };

  return (
    <Modal options={options} title="Delete Song">
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 dark:text-white">
            Are you sure you want to delete {data.artist} &ndash; {data.title}?
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSongModal;
