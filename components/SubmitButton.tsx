'use client';
import { useFormStatus } from 'react-dom';

import { Button } from 'components/ui/button';
import Spinner from 'components/Spinner';

interface Props {
  className?: string;
  submitting?: boolean;
}

export default function SubmitButton({ className = '', submitting }: Props) {
  const { pending } = useFormStatus();
  const loading = pending || submitting;

  return (
    <Button className={className} disabled={loading} type="submit">
      {loading && <Spinner className="mr-2 size-4" />}
      Submit
    </Button>
  );
}
