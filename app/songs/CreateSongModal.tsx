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
import { createSong } from './actions';
import { songSchema, type SongInput } from './schema';

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function CreateSongModal() {
  const [open, setOpen] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SongInput>({
    defaultValues,
    resolver: zodResolver(songSchema),
  });

  function onClose() {
    setOpen(false);
    reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit,
    submitFn: createSong,
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <SecondaryButton label="New" />
      </Modal.Button>
      <Modal.Content title="Create song">
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
                error={errors.link}
                id="link"
                type="text"
                {...register('link')}
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
