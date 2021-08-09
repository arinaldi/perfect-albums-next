import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES, METHODS } from 'constants/index';
import api, { fetcher } from 'utils/api';
import useStore from 'hooks/useStore';
import Modal from 'components/Modal';

const DeleteReleaseModal: FC = () => {
  const data = useStore((state) => state.data);
  const isOpen = useStore((state) => state.isOpen);
  const key = isOpen ? '/api/releases' : null;
  const { mutate } = useSWR(key, fetcher);
  const options = {
    callbacks: [mutate],
    submitFn: async () => {
      await api('/api/releases', {
        body: { id: data.id },
        method: METHODS.DELETE,
      });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };

  return (
    <Modal options={options} title="Delete Release">
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

export default DeleteReleaseModal;
