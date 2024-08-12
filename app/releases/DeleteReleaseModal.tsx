import { FormEvent } from 'react';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from 'utils/constants';
import { Release } from 'utils/types';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubmitButton from 'components/SubmitButton';
import { deleteRelease } from './actions';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function DeleteReleaseModal({ onClose, release }: Props) {
  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const result = await deleteRelease(release.id);

      if (result.type === 'error') {
        throw new Error(result.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete {release.artist} &ndash;{' '}
          {release.title}?
        </DialogTitle>
        <DialogDescription>This action cannot be undone</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <DialogFooter>
          <SubmitButton submitting={submitting} variant="destructive">
            Delete
          </SubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
