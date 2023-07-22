import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { songSchema } from 'app/songs/schema';
import { MESSAGES } from 'utils/constants';
import useInsert from 'hooks/useInsert';
import useSubmit from 'hooks/useSubmit';
import { SongInput } from 'utils/types';
import Input from 'components/Input';
import Modal from 'components/Modal';
import OutlineButton from 'components/OutlineButton';
import SubmitButton from 'components/SubmitButton';

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function CreateSongModal() {
  const [open, setOpen] = useState(false);
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

  function onClose() {
    setOpen(false);
    reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit,
    submitFn: async (song: SongInput) => {
      await createSong(song);
    },
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <OutlineButton>New</OutlineButton>
      </Modal.Button>
      <Modal.Content title="Create Song">
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
            <OutlineButton onClick={onClose}>Cancel</OutlineButton>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
}
