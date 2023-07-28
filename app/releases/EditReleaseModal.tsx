import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { releaseSchema } from 'app/releases/schema';
import { MESSAGES } from 'utils/constants';
import useUpdate from 'hooks/useUpdate';
import useSubmit from 'hooks/useSubmit';
import { formatDate } from 'utils';
import { Release, ReleaseInput } from 'utils/types';
import Input from 'components/Input';
import Modal from 'components/Modal';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';

interface Props {
  data: Release | null;
}

export default function EditReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
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

  function onClose() {
    setOpen(false);
  }

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
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button className="cursor-pointer hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
        <Pencil1Icon className="inline h-4 w-4" />
      </Modal.Button>
      <Modal.Content title="Edit Release">
        <form className="mt-6" onSubmit={onSubmit}>
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
          <div className="mt-8 flex items-center justify-end gap-2">
            <SecondaryButton onClick={onClose} />
            <PrimaryButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
