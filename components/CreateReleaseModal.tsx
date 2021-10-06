import { FC } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS } from 'constants/index';
import api from 'utils/api';
import { ReleaseInput } from 'utils/types';
import useStore from 'hooks/useStore';
import useSubmit from 'hooks/useSubmit';
import Input from 'components/Input';
import Modal from 'components/Modal';

const CreateReleaseModal: FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const { mutate } = useSWR(isOpen ? '/api/releases' : null);
  const { handleSubmit, register, reset } = useForm<ReleaseInput>();
  const { ref: artistRef, ...artistRest } = register('artist', {
    required: true,
  });
  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
  });
  const { ref: dateRef, ...dateRest } = register('date');

  function handleClose() {
    closeModal();
    reset();
  }

  const options = {
    callbacks: [handleClose, mutate],
    handleSubmit,
    submitFn: async (data: ReleaseInput) => {
      await api('/api/releases', { body: data, method: METHODS.POST });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      title="Create Release"
    >
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Input
              id="artist"
              inputRef={artistRef}
              required
              type="text"
              {...artistRest}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="title"
              inputRef={titleRef}
              required
              type="text"
              {...titleRest}
            />
          </div>
          <div className="col-span-6">
            <Input id="date" inputRef={dateRef} type="date" {...dateRest} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateReleaseModal;
