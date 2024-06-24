'use client';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useSubmit } from '@/hooks/submit';
import { MESSAGES, ROUTES_ADMIN } from '@/utils/constants';
import SubmitButton from '@/components/SubmitButton';
import { useMediaQuery } from '@/hooks/media-query';
import { Album } from '@/utils/types';
import { deleteAlbum } from '../../actions';

interface Props {
  album: Album;
  className?: string;
}

export default function DeleteAlbumModal({ album, className = '' }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();
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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={className}
            size={isDesktop ? 'default' : 'lg'}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete {album.artist} &ndash;{' '}
              {album.title}?
            </DialogTitle>
            <DialogDescription>This action cannot be undone</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <DialogFooter>
              <SubmitButton submitting={submitting} variant="destructive" />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className={className}
          size={isDesktop ? 'default' : 'lg'}
          variant="destructive"
        >
          Delete
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={onSubmit}>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              Are you sure you want to delete {album.artist} &ndash;{' '}
              {album.title}?
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-8 px-4">
            <SubmitButton
              className="w-full"
              size="lg"
              submitting={submitting}
              variant="destructive"
            />
          </div>
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button size="lg" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
