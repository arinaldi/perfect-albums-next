'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from 'hooks/useSubmit';
import { MESSAGES } from 'utils/constants';
import Input from 'components/Input';
import Modal from 'components/Modal';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import { createRelease } from './actions';
import { releaseSchema, type ReleaseInput } from './schema';

const defaultValues = {
  artist: '',
  title: '',
  date: '',
};

export default function CreateReleaseModal() {
  const [open, setOpen] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ReleaseInput>({
    defaultValues,
    resolver: zodResolver(releaseSchema),
  });

  function onClose() {
    setOpen(false);
    reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit,
    submitFn: createRelease,
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <PrimaryButton label="Add release" type="button" />
      </Modal.Button>
      <Modal.Content title="Add release">
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
          <Modal.Footer>
            <PrimaryButton isSubmitting={isSubmitting} />
            <SecondaryButton onClick={onClose} />
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
