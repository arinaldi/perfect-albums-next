'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { MESSAGES } from 'utils/constants';
import { useServerAction } from 'hooks/useServerAction';
import { formatDate } from 'utils';
import { Release } from 'utils/types';
import Input from 'components/Input';
import Modal from 'components/Modal';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import { editRelease } from './actions';
import { ReleaseInput, releaseSchema } from './schema';

interface Props {
  data: Release;
}

export default function EditReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
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

  const { isSubmitting, onSubmit } = useServerAction({
    callbacks: [onClose],
    handleSubmit,
    submitFn: editRelease.bind(null, data.id),
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
