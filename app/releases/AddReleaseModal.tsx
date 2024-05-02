'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { releaseSchema, type ReleaseInput } from './schema';
import { addRelease } from './actions';
import ReleaseForm from './ReleaseForm';

const defaultValues = {
  artist: '',
  title: '',
  date: '',
};

export default function AddReleaseModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<ReleaseInput>({
    defaultValues,
    resolver: zodResolver(releaseSchema),
  });

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { isSubmitting, onSubmit } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: ReleaseInput) => {
      const result = await addRelease(data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} added`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add release</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Add release</DialogTitle>
          <DialogDescription>What&apos;s the newest release?</DialogDescription>
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
