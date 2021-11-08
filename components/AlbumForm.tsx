import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { UseFormRegister } from 'react-hook-form';

import { ROUTES_ADMIN } from 'constants/index';
import { AlbumInput } from 'utils/types';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  isSubmitting: boolean;
  register: UseFormRegister<AlbumInput>;
  onSubmit: (event: FormEvent<Element>) => void;
}

export default function AlbumForm({ isSubmitting, onSubmit, register }: Props) {
  const router = useRouter();

  function handleCancel() {
    const query = { ...router.query };
    delete query.id;

    router.push({
      pathname: ROUTES_ADMIN.base.href,
      query,
    });
  }

  return (
    <form method="POST" onSubmit={onSubmit}>
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="mb-4">
              <Input
                id="artist"
                required
                type="text"
                {...register('artist', { required: true })}
              />
            </div>
            <div className="mb-4">
              <Input
                id="title"
                required
                type="text"
                {...register('title', { required: true })}
              />
            </div>
            <div className="mb-4">
              <Input
                id="year"
                required
                type="text"
                {...register('year', { required: true })}
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <Checkbox id="cd" label="CD" {...register('cd')} />
            <Checkbox
              id="aotd"
              label="Album of the Day"
              {...register('aotd')}
            />
            <Checkbox
              id="favorite"
              label="Favorite"
              {...register('favorite')}
            />
            <Checkbox
              id="studio"
              label="Studio Album"
              {...register('studio')}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6">
        <CancelButton onClick={handleCancel} />
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
