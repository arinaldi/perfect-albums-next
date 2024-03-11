'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from '@/components/AppLayout';
import { albumSchema, type AlbumInput } from '../schema';
import AlbumForm from '../AlbumForm';
import { addAlbum } from '../actions';

export default function AddAlbum() {
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

  return (
    <AppLayout className="max-w-sm" title="Add album">
      <AlbumForm action={addAlbum} form={form} />
    </AppLayout>
  );
}
