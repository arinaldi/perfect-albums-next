import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES } from 'constants/index';
import { fetcher } from 'utils/api';
import { Method } from 'utils/types';
import { useAppState } from 'components/Provider';
import Modal from 'components/Modal';

const DeleteReleaseModal: FC = () => {
  const { modal: { data } } = useAppState();
  const { mutate } = useSWR('/api/releases', fetcher);
  const options = {
    body: { id: data.id },
    callbacks: [mutate],
    method: Method.delete,
    path: '/api/releases',
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };

  return (
    <Modal
      options={options}
      title="Delete Release"
    >
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 dark:text-white">
            Are you sure you want to delete {data.artist} &ndash;{' '}
            {data.title}?
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReleaseModal;
