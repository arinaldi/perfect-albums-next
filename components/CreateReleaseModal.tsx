import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS } from 'constants/index';
import api from 'utils/api';
import { ReleaseInput } from 'utils/types';
import useStore from 'hooks/useStore';
import useSubmit from 'hooks/useSubmit';
import Input from 'components/Input';
import Modal from 'components/Modal';

export default function CreateReleaseModal() {
  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const { mutate } = useSWR(isOpen ? '/api/releases' : null);
  const { handleSubmit, register, reset } = useForm<ReleaseInput>();

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
}
