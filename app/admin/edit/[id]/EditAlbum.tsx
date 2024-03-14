'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from '@/components/AppLayout';
import { useSubmit } from '@/hooks/submit';
import { MESSAGES, ROUTES_ADMIN } from '@/utils/constants';
import { Album } from '@/utils/types';
import { albumSchema, type AlbumInput } from '../../schema';
import AlbumForm from '../../AlbumForm';
import { editAlbum } from '../../actions';

interface Props {
  album: Album;
}

export default function EditAlbum({ album }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<AlbumInput>({
    defaultValues: {
      artist: album.artist,
      title: album.title,
      year: Number(album.year),
      studio: album.studio,
      cd: album.cd,
      favorite: album.favorite,
    },
    resolver: zodResolver(albumSchema),
  });

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [
      () =>
        router.push(`${ROUTES_ADMIN.base.href}?${searchParams?.toString()}`),
      router.refresh,
    ],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: AlbumInput) => {
      const result = await editAlbum(album.id, data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  });

  return (
    <AppLayout className="max-w-sm" title="Edit album">
      <AlbumForm form={form} isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </AppLayout>
  );
}
