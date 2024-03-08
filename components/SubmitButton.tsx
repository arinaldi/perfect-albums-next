'use client';
import { useFormStatus } from 'react-dom';

import { Button, ButtonProps } from 'components/ui/button';
import Spinner from 'components/Spinner';

interface Props extends ButtonProps {
  className?: string;
  submitting?: boolean;
}

export default function SubmitButton({
  className = '',
  submitting,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const loading = pending || submitting;

  return (
    <Button {...props} className={className} disabled={loading} type="submit">
      {loading && <Spinner className="mr-2 size-4" />}
      Submit
    </Button>
  );
}
