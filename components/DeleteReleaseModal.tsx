import { MESSAGES, METHODS } from 'constants/index';
import useMutation from 'hooks/useMutation';
import useStore from 'hooks/useStore';
import useSubmit from 'hooks/useSubmit';
import Modal from 'components/Modal';

export default function DeleteReleaseModal() {
  const data = useStore((state) => state.data);
  const closeModal = useStore((state) => state.closeModal);
  const deleteRelease = useMutation('/api/releases');

  const options = {
    callbacks: [closeModal],
    submitFn: async () => {
      await deleteRelease({ body: { id: data.id }, method: METHODS.DELETE });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isSubmitting={isSubmitting}
      onClose={closeModal}
      onSubmit={onSubmit}
      title="Delete Release"
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
