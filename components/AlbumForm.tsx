import { ChangeEvent, FC, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { ROUTES_ADMIN } from 'constants/index';
import { AlbumInput } from 'utils/types';
import Input from 'components/Input';
import RadioFieldset from 'components/RadioFieldset';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  isSubmitting: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<Element>) => void;
  values: AlbumInput;
}

const AlbumForm: FC<Props> = ({ isSubmitting, onChange, onSubmit, values }) => {
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
                onChange={onChange}
                required
                type="text"
                value={values.artist}
              />
            </div>
            <div className="mb-4">
              <Input
                id="title"
                onChange={onChange}
                required
                type="text"
                value={values.title}
              />
            </div>
            <div className="mb-4">
              <Input
                id="year"
                onChange={onChange}
                required
                type="text"
                value={values.year}
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <RadioFieldset
              id="cd"
              label="CD"
              onChange={onChange}
              value={values.cd}
            />
            <RadioFieldset
              id="aotd"
              label="Album of the Day"
              onChange={onChange}
              value={values.aotd}
            />
            <RadioFieldset
              id="favorite"
              label="Favorite"
              onChange={onChange}
              value={values.favorite}
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
