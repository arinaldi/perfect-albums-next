'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { albumSchema } from 'app/admin/schema';
import useInsert from 'hooks/useInsert';
import useSubmit from 'hooks/useSubmit';
import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import { AlbumInput } from 'utils/types';
import AppLayout from 'components/AppLayout';
import AlbumForm from 'app/admin/AlbumForm';

export default function CreateAlbum() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AlbumInput>({
    defaultValues: {
      artist: '',
      title: '',
      year: new Date().getFullYear().toString(),
      studio: false,
      cd: false,
      favorite: false,
    },
    resolver: zodResolver(albumSchema),
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
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
        onSubmit={onSubmit}
      />
    </AppLayout>
  );
}
