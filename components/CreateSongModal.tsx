import { FC } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS } from 'constants/index';
import api from 'utils/api';
import { SongInput } from 'utils/types';
import useSubmit from 'hooks/useSubmit';
import useStore from 'hooks/useStore';
import Input from 'components/Input';
import Modal from 'components/Modal';

const CreateSongModal: FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const { mutate } = useSWR(isOpen ? '/api/songs' : null);
  const { handleSubmit, register, reset } = useForm<SongInput>();
  const { ref: artistRef, ...artistRest } = register('artist', {
    required: true,
  });
  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
  });
  const { ref: linkRef, ...linkRest } = register('link', {
    required: true,
  });

  function handleClose() {
    closeModal();
    reset();
  }

  const options = {
    callbacks: [handleClose, mutate],
    handleSubmit,
    submitFn: async (data: SongInput) => {
      await api('/api/songs', { body: data, method: METHODS.POST });
    },
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      title="Create Song"
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
            <Input
              id="link"
              inputRef={linkRef}
              required
              type="text"
              {...linkRest}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSongModal;
