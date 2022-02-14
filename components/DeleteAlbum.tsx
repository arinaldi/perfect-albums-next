import { FormEvent } from 'react';
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

export default function DeleteAlbum({ album, isSubmitting, onSubmit }: Props) {
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
    <div className="mx-auto max-w-7xl p-4 dark:bg-gray-800">
      <h1 className="text-2xl font-semibold dark:text-white sm:text-3xl">
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
          <SubmitButton
            isSubmitting={isSubmitting}
            label="Delete"
            loadingLabel="Deleting"
          />
        </form>
      </div>
    </div>
  );
}
