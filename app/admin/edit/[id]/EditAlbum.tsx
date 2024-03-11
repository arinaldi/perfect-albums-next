'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from '@/components/AppLayout';
import { Album } from '@/utils/types';
import { albumSchema, type AlbumInput } from '../../schema';
import AlbumForm from '../../AlbumForm';
import { editAlbum } from '../../actions';

interface Props {
  album: Album;
}

export default function EditAlbum({ album }: Props) {
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

  return (
    <AppLayout className="max-w-sm" title="Edit album">
      <AlbumForm action={editAlbum} form={form} id={album.id} />
    </AppLayout>
  );
}
