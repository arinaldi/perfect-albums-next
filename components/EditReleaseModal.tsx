import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES, METHODS } from 'constants/index';
import { formatDate } from 'utils';
import api from 'utils/api';
import { ReleaseInput } from 'utils/types';
import useForm from 'hooks/useForm';
import useStore from 'hooks/useStore';
import Input from 'components/Input';
import Modal from 'components/Modal';

const EditReleaseModal: FC = () => {
  const data = useStore((state) => state.data);
  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const { mutate } = useSWR(isOpen ? '/api/releases' : null);
  const { values, handleChange, resetForm } = useForm<ReleaseInput>({
    artist: data.artist,
    title: data.title,
    date: formatDate(data.date),
  });

  function handleClose() {
    closeModal();
    resetForm();
  }

  const options = {
    callbacks: [handleClose, mutate],
    submitFn: async () => {
      await api('/api/releases', {
        body: { ...values, id: data.id },
        method: METHODS.PUT,
      });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };

  return (
    <Modal onClose={handleClose} options={options} title="Edit Release">
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Input
              id="artist"
              onChange={handleChange}
              required
              type="text"
              value={values.artist}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="title"
              onChange={handleChange}
              required
              type="text"
              value={values.title}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="date"
              onChange={handleChange}
              type="date"
              value={values.date}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditReleaseModal;
