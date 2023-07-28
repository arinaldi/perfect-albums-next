import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import useDelete from 'hooks/useDelete';
import useSubmit from 'hooks/useSubmit';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import Modal from 'components/Modal';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';

interface Props {
  data: Release | null;
}

export default function DeleteReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const deleteRelease = useDelete('releases');
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async () => {
      await deleteRelease(data?.id || 0);
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button className="cursor-pointer hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
        <TrashIcon className="inline h-4 w-4" />
      </Modal.Button>
      <Modal.Content title="Delete Release">
        <form className="mt-6 dark:text-white" onSubmit={onSubmit}>
          <p>
            Are you sure you want to delete {data?.artist} &ndash; {data?.title}
            ?
          </p>
          <div className="mt-8 flex items-center justify-end gap-2">
            <Modal.Button asChild>
              <SecondaryButton />
            </Modal.Button>
            <PrimaryButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
