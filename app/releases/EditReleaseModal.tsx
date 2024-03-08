'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { useSubmit } from 'hooks/useSubmit';
import { formatDate } from 'utils';
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
import { releaseSchema, type ReleaseInput } from './schema';
import { editRelease } from './actions';
import ReleaseForm from './ReleaseForm';

interface Props {
  data: Release;
}

export default function EditReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();
  const form = useForm<ReleaseInput>({
    resolver: zodResolver(releaseSchema),
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!data) return;

    reset({
      artist: data.artist,
      title: data.title,
      date: data.date ? formatDate(data.date) : '',
    });
  }, [data, reset]);

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    handleSubmit,
    submitFn: editRelease.bind(null, data.id),
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex-shrink-0" size="icon" variant="ghost">
            <Pencil1Icon className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Edit release</DialogTitle>
            <DialogDescription>Update data for new release</DialogDescription>
          </DialogHeader>
          <ReleaseForm
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex-shrink-0" size="icon" variant="ghost">
          <Pencil1Icon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit release</DrawerTitle>
          <DrawerDescription>Update data for new release</DrawerDescription>
        </DrawerHeader>
        <ReleaseForm
          className="px-4"
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
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
