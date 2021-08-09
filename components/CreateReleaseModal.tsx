import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES, METHODS } from 'constants/index';
import api, { fetcher } from 'utils/api';
import { ReleaseInput } from 'utils/types';
import useForm from 'hooks/useForm';
import useStore from 'hooks/useStore';
import Input from 'components/Input';
import Modal from 'components/Modal';

const CreateReleaseModal: FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const key = isOpen ? '/api/releases' : null;
  const { mutate } = useSWR(key, fetcher);
  const { values, handleChange, resetForm } = useForm<ReleaseInput>({
    artist: '',
    title: '',
    date: '',
  });

  function handleClose() {
    closeModal();
    resetForm();
  }

  const options = {
    callbacks: [handleClose, mutate],
    submitFn: async () => {
      await api('/api/releases', { body: values, method: METHODS.POST });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };

  return (
    <Modal onClose={handleClose} options={options} title="Create Release">
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

export default CreateReleaseModal;
