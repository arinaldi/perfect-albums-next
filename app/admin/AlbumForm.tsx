'use client';

import { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { setStringAsInt } from 'utils';
import { ROUTES_ADMIN } from 'utils/constants';
import { AlbumInput } from 'utils/types';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import OutlineButton from 'components/OutlineButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  errors: FieldErrors<AlbumInput>;
  isSubmitting: boolean;
  register: UseFormRegister<AlbumInput>;
  onSubmit: (event: FormEvent<Element>) => void;
}

export default function AlbumForm({
  errors,
  isSubmitting,
  onSubmit,
  register,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <form method="POST" onSubmit={onSubmit}>
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            error={errors.artist}
            id="artist"
            type="text"
            wrapperClassName="order-1 sm:order-1"
            {...register('artist')}
          />
          <Input
            error={errors.title}
            id="title"
            type="text"
            wrapperClassName="order-2 sm:order-3"
            {...register('title')}
          />
          <Input
            error={errors.year}
            id="year"
            type="number"
            wrapperClassName="order-3 sm:order-5"
            {...register('year', { setValueAs: setStringAsInt })}
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
      <div className="flex items-center px-6">
        <OutlineButton
          onClick={() => {
            router.push(
              `${ROUTES_ADMIN.base.href}?${searchParams?.toString()}`,
            );
          }}
        >
          Cancel
        </OutlineButton>
        <span className="ml-1" />
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
