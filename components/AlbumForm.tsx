import { FC, FormEvent } from 'react';
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

const AlbumForm: FC<Props> = ({ isSubmitting, onSubmit, register }) => {
  const router = useRouter();
  const { ref: artistRef, ...artistRest } = register('artist', {
    required: true,
  });
  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
  });
  const { ref: yearRef, ...yearRest } = register('year', { required: true });
  const { ref: cdRef, ...cdRest } = register('cd');
  const { ref: aotdRef, ...aotdRest } = register('aotd');
  const { ref: favoriteRef, ...favoriteRest } = register('favorite');
  const { ref: studioRef, ...studioRest } = register('studio');

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
                inputRef={artistRef}
                required
                type="text"
                {...artistRest}
              />
            </div>
            <div className="mb-4">
              <Input
                id="title"
                inputRef={titleRef}
                required
                type="text"
                {...titleRest}
              />
            </div>
            <div className="mb-4">
              <Input
                id="year"
                inputRef={yearRef}
                required
                type="text"
                {...yearRest}
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <Checkbox id="cd" inputRef={cdRef} label="CD" {...cdRest} />
            <Checkbox
              id="aotd"
              inputRef={aotdRef}
              label="Album of the Day"
              {...aotdRest}
            />
            <Checkbox
              id="favorite"
              inputRef={favoriteRef}
              label="Favorite"
              {...favoriteRest}
            />
            <Checkbox
              id="studio"
              inputRef={studioRef}
              label="Studio Album"
              {...studioRest}
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
};

export default AlbumForm;
