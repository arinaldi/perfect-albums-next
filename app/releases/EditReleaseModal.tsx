import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/submit';
import { formatDate } from 'utils';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { releaseSchema, type ReleaseInput } from './schema';
import { editRelease } from './actions';
import ReleaseForm from './ReleaseForm';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function EditReleaseModal({ onClose, release }: Props) {
  const form = useForm({
    defaultValues: {
      artist: release.artist,
      title: release.title,
      date: release.date ? formatDate(release.date) : '',
    },
    resolver: zodResolver(releaseSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: ReleaseInput) => {
      const result = await editRelease(release.id, data);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit release</DialogTitle>
        <DialogDescription>Update data for new release</DialogDescription>
      </DialogHeader>
      <ReleaseForm form={form} onSubmit={onSubmit} submitting={submitting} />
    </DialogContent>
  );
}
