import { MESSAGES } from 'constants/index';
import useDelete from 'hooks/useDelete';
import useStore from 'hooks/useStore';
import useSubmit from 'hooks/useSubmit';
import Modal from 'components/Modal';

export default function DeleteSongModal() {
  const data = useStore((state) => state.data);
  const closeModal = useStore((state) => state.closeModal);
  const deleteSong = useDelete('songs');

  const options = {
    callbacks: [closeModal],
    submitFn: async () => {
      await deleteSong(data.id);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isSubmitting={isSubmitting}
      onClose={closeModal}
      onSubmit={onSubmit}
      title="Delete Song"
    >
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 dark:text-white">
            Are you sure you want to delete {data.artist} &ndash; {data.title}?
          </div>
        </div>
      </div>
    </Modal>
  );
}
