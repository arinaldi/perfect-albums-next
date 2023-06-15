import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { releaseSchema } from 'app/releases/schema';
import { MESSAGES } from 'utils/constants';
import useInsert from 'hooks/useInsert';
import useSubmit from 'hooks/useSubmit';
import { ReleaseInput } from 'utils/types';
import Input from 'components/Input';
import Modal from 'components/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues = {
  artist: '',
  title: '',
  date: '',
};

export default function CreateReleaseModal({ isOpen, onClose }: Props) {
  const createRelease = useInsert('releases');
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ReleaseInput>({
    defaultValues,
    resolver: zodResolver(releaseSchema),
  });

  function handleClose() {
    onClose();
    reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [handleClose],
    handleSubmit,
    submitFn: async (release: ReleaseInput) => {
      await createRelease({ ...release, date: release.date || null });
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  });

  return (
    <Modal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      title="Create Release"
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
