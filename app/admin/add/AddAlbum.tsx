'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from '@/components/AppLayout';
import { useSubmit } from '@/hooks/submit';
import { MESSAGES, ROUTES_ADMIN } from '@/utils/constants';
import { albumSchema, type AlbumInput } from '../schema';
import AlbumForm from '../AlbumForm';
import { addAlbum } from '../actions';

export default function AddAlbum() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<AlbumInput>({
    defaultValues: {
      artist: '',
      title: '',
      year: new Date().getFullYear(),
      studio: false,
      cd: false,
      favorite: false,
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
      const result = await addAlbum(data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} added`,
  });

  return (
    <AppLayout className="max-w-sm" title="Add album">
      <AlbumForm form={form} isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </AppLayout>
  );
}
