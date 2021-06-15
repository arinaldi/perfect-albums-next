import { ChangeEvent, FC, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { ROUTES_ADMIN } from 'constants/index';
import { AlbumInput } from 'hooks/useForm';
import Input from 'components/Input';
import RadioFieldset from 'components/RadioFieldset';
import CancelButton from 'components/CancelButton';

interface Props {
  isSubmitting: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<Element>) => void;
  values: AlbumInput;
}

const AlbumForm: FC<Props> = ({ isSubmitting, onChange, onSubmit, values }) => {
  const router = useRouter();
  const { search } = router.query;

  function handleCancel() {
    router.push({
      pathname: ROUTES_ADMIN.base.href,
      query: { search },
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
        <button
          className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-800"
          disabled={isSubmitting}
          style={{
            minWidth: '135px',
            transition: 'all .15s ease',
          }}
          type="submit"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default AlbumForm;
