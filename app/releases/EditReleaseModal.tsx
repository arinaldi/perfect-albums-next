import { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { useSubmit } from '@/hooks/submit';
import { formatDate } from 'utils';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { releaseSchema, type ReleaseInput } from './schema';
import { editRelease } from './actions';
import ReleaseForm from './ReleaseForm';

interface Props {
  onClose: () => void;
  release: Release;
}

const Trigger = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onSelect={(event) => {
        event.preventDefault();
      }}
      ref={ref}
      {...props}
    >
      <Pencil1Icon className="size-4" />
      Edit
    </DropdownMenuItem>
  );
});

Trigger.displayName = 'Trigger';

export default function EditReleaseModal({ onClose, release }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<ReleaseInput>({
    resolver: zodResolver(releaseSchema),
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!release) return;

    reset({
      artist: release.artist,
      title: release.title,
      date: release.date ? formatDate(release.date) : '',
    });
  }, [release, reset]);

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false), onClose],
    handleSubmit,
    submitFn: async (data: ReleaseInput) => {
      const result = await editRelease(release.id, data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trigger />
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
