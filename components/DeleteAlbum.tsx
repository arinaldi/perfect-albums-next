import { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { ROUTES_ADMIN } from 'constants/index';
import { Album } from 'utils/types';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  album: Album;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent) => void;
}

const DeleteAlbum: FC<Props> = ({ album, isSubmitting, onSubmit }) => {
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
    <div className="min-h-screen max-w-7xl mx-auto p-4 dark:bg-gray-800">
      <h1 className="text-2xl sm:text-3xl font-semibold dark:text-white">
        Delete Album
      </h1>
      <div className="relative flex-auto">
        <div className="bg-white p-6 dark:bg-gray-800 dark:text-white">
          Are you sure you want to delete {album.artist} – {album.title}?
        </div>
        <form
          className="flex items-center justify-end p-6"
          method="POST"
          onSubmit={onSubmit}
        >
          <CancelButton onClick={handleCancel} />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default DeleteAlbum;
