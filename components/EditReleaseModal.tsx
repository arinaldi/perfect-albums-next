import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { MESSAGES } from 'constants/index';
import useUpdate from 'hooks/useUpdate';
import useSubmit from 'hooks/useSubmit';
import { formatDate } from 'utils';
import { Release, ReleaseInput } from 'utils/types';
import Input from 'components/Input';
import Modal from 'components/Modal';

interface Props {
  data: Release | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditReleaseModal({ data, isOpen, onClose }: Props) {
  const editRelease = useUpdate('releases');
  const { handleSubmit, register, setValue } = useForm<ReleaseInput>();

  useEffect(() => {
    if (data) {
      setValue('artist', data.artist);
      setValue('title', data.title);
      setValue('date', formatDate(data.date || ''));
    }
  }, [data, setValue]);

  const options = {
    callbacks: [onClose],
    handleSubmit,
    submitFn: async (release: ReleaseInput) => {
      await editRelease(data?.id || 0, {
        ...release,
        date: release.date || null,
      });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <Modal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
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
}
