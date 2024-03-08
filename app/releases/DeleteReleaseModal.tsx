'use client';
import { FormEvent, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useSubmit } from 'hooks/useSubmit';
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
import { useMediaQuery } from '@/components/ui/use-media-query';
import SubmitButton from 'components/SubmitButton';
import { deleteRelease } from './actions';

interface Props {
  data: Release;
}

export default function DeleteReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();
      await deleteRelease(data.id);
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex-shrink-0" size="icon" variant="ghost">
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
              {data.artist} &ndash; {data.title}
            </p>
            <SubmitButton
              className="w-full sm:w-auto"
              submitting={isSubmitting}
              variant="destructive"
            />
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex-shrink-0" size="icon" variant="ghost">
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
              {data.artist} &ndash; {data.title}
            </p>
            <SubmitButton
              className="w-full sm:w-auto"
              size="lg"
              submitting={isSubmitting}
              variant="destructive"
            />
          </div>
        </form>
        <DrawerFooter>
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
