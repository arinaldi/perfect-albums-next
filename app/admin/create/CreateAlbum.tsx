'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import useInsert from 'hooks/useInsert';
import useSubmit from 'hooks/useSubmit';
import { AlbumInput } from 'utils/types';
import AppLayout from 'components/AppLayout';
import AlbumForm from 'app/admin/AlbumForm';

export default function CreateAlbum() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleSubmit, register } = useForm<AlbumInput>({
    defaultValues: {
      year: new Date().getFullYear().toString(),
    },
  });
  const createAlbum = useInsert('albums');

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [
      () =>
        router.push(`${ROUTES_ADMIN.base.href}?${searchParams?.toString()}`),
    ],
    handleSubmit,
    submitFn: async (album: AlbumInput) => {
      await createAlbum(album);
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  });

  return (
    <AppLayout title="Create Album">
      <AlbumForm
        isSubmitting={isSubmitting}
        register={register}
        onSubmit={onSubmit}
      />
    </AppLayout>
  );
}
