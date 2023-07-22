import { MESSAGES } from 'utils/constants';
import useDelete from 'hooks/useDelete';
import useSubmit from 'hooks/useSubmit';
import { Release } from 'utils/types';
import Modal from '@/components/Modal_OLD';

interface Props {
  data: Release | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteReleaseModal({ data, isOpen, onClose }: Props) {
  const deleteRelease = useDelete('releases');
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    submitFn: async () => {
      await deleteRelease(data?.id || 0);
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  return (
    <Modal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Delete Release"
    >
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 dark:text-white">
            Are you sure you want to delete {data?.artist} &ndash; {data?.title}
            ?
          </div>
        </div>
      </div>
    </Modal>
  );
}
