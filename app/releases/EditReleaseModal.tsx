import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { releaseSchema } from 'app/releases/schema';
import { MESSAGES } from 'utils/constants';
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
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ReleaseInput>({
    resolver: zodResolver(releaseSchema),
  });

  useEffect(() => {
    if (!data) return;

    reset({
      artist: data.artist,
      title: data.title,
      date: data.date ? formatDate(data.date) : '',
    });
  }, [data, reset]);

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit,
    submitFn: async (release: ReleaseInput) => {
      await editRelease(data?.id || 0, {
        ...release,
        date: release.date || null,
      });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

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
              error={errors.artist}
              id="artist"
              type="text"
              {...register('artist')}
            />
          </div>
          <div className="col-span-6">
            <Input
              error={errors.title}
              id="title"
              type="text"
              {...register('title')}
            />
          </div>
          <div className="col-span-6">
            <Input
              error={errors.date}
              id="date"
              type="date"
              {...register('date')}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
