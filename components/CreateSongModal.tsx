import { useForm } from 'react-hook-form';

import { MESSAGES } from 'constants/index';
import { SongInput } from 'utils/types';
import useInsert from 'hooks/useInsert';
import useSubmit from 'hooks/useSubmit';
import useStore from 'hooks/useStore';
import Input from 'components/Input';
import Modal from 'components/Modal';

export default function CreateSongModal() {
  const closeModal = useStore((state) => state.closeModal);
  const createSong = useInsert('songs');
  const { handleSubmit, register, reset } = useForm<SongInput>();

  function handleClose() {
    closeModal();
    reset();
  }

  const options = {
    callbacks: [handleClose],
    handleSubmit,
    submitFn: async (song: SongInput) => {
      await createSong(song);
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
            <Input
              id="link"
              required
              type="text"
              {...register('link', { required: true })}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
