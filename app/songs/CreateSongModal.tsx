'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { songSchema } from 'app/songs/schema';
import { MESSAGES } from 'utils/constants';
import useInsert from 'hooks/useInsert';
import useSubmit from 'hooks/useSubmit';
import { SongInput } from 'utils/types';
import Input from 'components/Input';
import Modal from 'components/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function CreateSongModal({ isOpen, onClose }: Props) {
  const createSong = useInsert('songs');
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SongInput>({
    defaultValues,
    resolver: zodResolver(songSchema),
  });

  function handleClose() {
    onClose();
    reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [handleClose],
    handleSubmit,
    submitFn: async (song: SongInput) => {
      await createSong(song);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  });

  return (
    <Modal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      title="Create Song"
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
              error={errors.link}
              id="link"
              type="text"
              {...register('link')}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
