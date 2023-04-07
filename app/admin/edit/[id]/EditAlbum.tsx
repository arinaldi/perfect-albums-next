'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { albumSchema } from 'app/admin/schema';
import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import useSubmit from 'hooks/useSubmit';
import useUpdate from 'hooks/useUpdate';
import { Album, AlbumInput } from 'utils/types';
import AppLayout from 'components/AppLayout';
import AlbumForm from 'app/admin/AlbumForm';

interface Props {
  album: Album;
}

export default function EditAlbum({ album }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AlbumInput>({
    defaultValues: album,
    resolver: zodResolver(albumSchema),
  });
  const editAlbum = useUpdate('albums');

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [
      () =>
        router.push(`${ROUTES_ADMIN.base.href}?${searchParams?.toString()}`),
    ],
    handleSubmit,
    submitFn: async (data: AlbumInput) => {
      await editAlbum(album.id, data);
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  });

  return (
    <AppLayout title="Edit Album">
      <AlbumForm
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
        onSubmit={onSubmit}
      />
    </AppLayout>
  );
}
