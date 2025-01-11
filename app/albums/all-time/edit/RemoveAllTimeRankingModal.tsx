import { FormEvent, useState } from 'react';
import { XIcon } from 'lucide-react';

import { useSubmit } from '@/hooks/submit';
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
import SubmitButton from 'components/SubmitButton';
import { AllTimeListItem } from './EditAllTimeRankings';
import { removeAllTimeRanking } from './actions';

interface Props {
  item: AllTimeListItem;
  removeItem: (id: number) => void;
}

export default function RemoveAllTimeRankingModal({ item, removeItem }: Props) {
  const [open, setOpen] = useState(false);
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const result = await removeAllTimeRanking(item.rankingId);

      if (result.type === 'error') {
        throw new Error(result.message);
      }

      removeItem(item.id);
    },
    successMessage: 'All-time ranking removed',
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="size-6" size="icon" type="button" variant="ghost">
          <XIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to remove this all-time ranking?
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
    </Dialog>
  );
}
