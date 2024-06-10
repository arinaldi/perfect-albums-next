'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';

import AppLayout from '@/components/AppLayout';
import { useSubmit } from '@/hooks/submit';
import { MESSAGES, ROUTES_ADMIN } from '@/utils/constants';
import SubmitButton from '@/components/SubmitButton';
import { Album } from '@/utils/types';
import { deleteAlbum } from '../../actions';

interface Props {
  album: Album;
}

export default function DeleteAlbum({ album }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { onSubmit, submitting } = useSubmit({
    callbacks: [
      () =>
        router.push(`${ROUTES_ADMIN.base.href}?${searchParams?.toString()}`),
      router.refresh,
    ],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const result = await deleteAlbum(album.id);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  });

  return (
    <AppLayout className="max-w-sm" title="Delete album">
      <form className="space-y-8" onSubmit={onSubmit}>
        <div className="text-sm leading-7">
          Are you sure you want to delete {album.artist} – {album.title}?
        </div>
        <SubmitButton
          className="w-full sm:w-auto"
          submitting={submitting}
          variant="destructive"
        />
      </form>
    </AppLayout>
  );
}
