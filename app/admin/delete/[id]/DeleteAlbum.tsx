'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import useDelete from 'hooks/useDelete';
import useSubmit from 'hooks/useSubmit';
import { Album } from 'utils/types';
import AppLayout from 'components/AppLayout';
import OutlineButton from 'components/OutlineButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  album: Album;
}

export default function DeleteAlbum({ album }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deleteAlbum = useDelete('albums');

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [
      () =>
        router.push(`${ROUTES_ADMIN.base.href}?${searchParams?.toString()}`),
    ],
    submitFn: async () => {
      await deleteAlbum(album.id);
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  });

  return (
    <AppLayout title="Delete Album">
      <div className="relative flex-auto">
        <div className="bg-white p-6 dark:bg-gray-800 dark:text-white">
          Are you sure you want to delete {album.artist} – {album.title}?
        </div>
        <form
          className="flex items-center justify-end p-6"
          method="POST"
          onSubmit={onSubmit}
        >
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
        </form>
      </div>
    </AppLayout>
  );
}
