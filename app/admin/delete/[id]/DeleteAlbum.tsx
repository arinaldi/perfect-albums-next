'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import AppLayout from '@/components/AppLayout';
import SubmitButton from '@/components/SubmitButton';
import { useMediaQuery } from '@/components/ui/use-media-query';
import { Album } from '@/utils/types';
import { deleteAlbum } from '../../actions';
import { initialState } from '../../schema';

interface Props {
  album: Album;
}

export default function DeleteAlbum({ album }: Props) {
  const [state, formAction] = useFormState(deleteAlbum, initialState);
  const isDesktop = useMediaQuery();

  useEffect(() => {
    if (!state.message) return;

    if (state.message) {
      toast.error(state.message.split('-')[0].trim());
    }
  }, [state.message]);

  async function actionWithValidation(formData: FormData) {
    formData.append('id', album.id.toString());
    formAction(formData);
  }

  return (
    <AppLayout className="max-w-sm" title="Delete album">
      <form action={actionWithValidation} className="space-y-8">
        <div className="text-sm leading-7">
          Are you sure you want to delete {album.artist} – {album.title}?
        </div>
        <SubmitButton
          className="w-full sm:w-auto"
          size={isDesktop ? 'default' : 'lg'}
          variant="destructive"
        />
      </form>
    </AppLayout>
  );
}
