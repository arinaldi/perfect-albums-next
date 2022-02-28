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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            id="artist"
            required
            type="text"
            wrapperClassName="order-1 sm:order-1"
            {...register('artist', { required: true })}
          />
          <Input
            id="title"
            required
            type="text"
            wrapperClassName="order-2 sm:order-3"
            {...register('title', { required: true })}
          />
          <Input
            id="year"
            required
            type="text"
            wrapperClassName="order-3 sm:order-5"
            {...register('year', { required: true })}
          />
          <Checkbox
            id="studio"
            label="Studio Album"
            wrapperClassName="order-4 sm:order-2"
            {...register('studio')}
          />
          <Checkbox
            id="cd"
            label="CD"
            wrapperClassName="order-5 sm:order-4"
            {...register('cd')}
          />
          <Checkbox
            id="favorite"
            label="Favorite"
            wrapperClassName="order-6 sm:order-6"
            {...register('favorite')}
          />
        </div>
      </div>
      <div className="flex items-center justify-end p-6">
        <CancelButton onClick={handleCancel} />
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
