import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  submitting?: boolean;
}

export function SubmitButton({ submitting }: Props) {
  const { pending } = useFormStatus();
  const loading = pending || submitting;

  return (
    <Button disabled={loading} type="submit">
      {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
      Submit
    </Button>
  );
}
