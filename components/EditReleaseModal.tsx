import { FC, useEffect } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS } from 'constants/index';
import { formatDate } from 'utils';
import api from 'utils/api';
import { ReleaseInput } from 'utils/types';
import useStore from 'hooks/useStore';
import useSubmit from 'hooks/useSubmit';
import Input from 'components/Input';
import Modal from 'components/Modal';

const EditReleaseModal: FC = () => {
  const data = useStore((state) => state.data);
  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const { mutate } = useSWR(isOpen ? '/api/releases' : null);
  const { handleSubmit, register, setValue } = useForm<ReleaseInput>({});

  useEffect(() => {
    if (data) {
      setValue('artist', data.artist);
      setValue('title', data.title);
      setValue('date', formatDate(data.date));
    }
  }, [data, setValue]);

  function handleClose() {
    closeModal();
  }

  const options = {
    callbacks: [handleClose, mutate],
    handleSubmit,
    submitFn: async (release: ReleaseInput) => {
      await api('/api/releases', {
        body: { ...release, id: data.id },
        method: METHODS.PUT,
      });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      title="Edit Release"
    >
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Input
              id="artist"
              required
              type="text"
              {...register('artist', { required: true })}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="title"
              required
              type="text"
              {...register('title', { required: true })}
            />
          </div>
          <div className="col-span-6">
            <Input id="date" type="date" {...register('date')} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditReleaseModal;
