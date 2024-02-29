'use client';
import { FormEvent, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useSubmit } from 'hooks/useSubmit';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import SubmitButton from 'components/SubmitButton';
import { deleteRelease } from './actions';

interface Props {
  data: Release;
}

export default function DeleteReleaseModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();
      await deleteRelease(data.id);
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-shrink-0" size="icon" variant="ghost">
          <TrashIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-8" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Delete release</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {data.artist} &ndash; {data.title}
              ?
            </DialogDescription>
          </DialogHeader>
          <SubmitButton
            className="w-full sm:w-auto"
            submitting={isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
