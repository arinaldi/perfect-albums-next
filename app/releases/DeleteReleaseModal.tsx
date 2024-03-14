'use client';
import { FormEvent, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useMediaQuery } from '@/hooks/media-query';
import SubmitButton from 'components/SubmitButton';
import { deleteRelease } from './actions';

interface Props {
  release: Release;
}

export default function DeleteReleaseModal({ release }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const result = await deleteRelease(release.id);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <TrashIcon className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form className="space-y-8" onSubmit={onSubmit}>
            <DialogHeader className="text-left">
              <DialogTitle>Delete release</DialogTitle>
              <DialogDescription>Are you sure?</DialogDescription>
            </DialogHeader>
            <p className="text-sm">
              {release.artist} &ndash; {release.title}
            </p>
            <SubmitButton submitting={isSubmitting} variant="destructive" />
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <TrashIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={onSubmit}>
          <DrawerHeader className="text-left">
            <DrawerTitle>Delete release</DrawerTitle>
            <DrawerDescription>Are you sure?</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-8 px-4">
            <p className="text-sm">
              {release.artist} &ndash; {release.title}
            </p>
            <SubmitButton
              className="w-full"
              submitting={isSubmitting}
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
