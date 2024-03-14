'use client';
import { useFormStatus } from 'react-dom';

import { Button, ButtonProps } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { useMediaQuery } from '@/hooks/media-query';

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
  const isDesktop = useMediaQuery();

  return (
    <Button
      {...props}
      className={className}
      disabled={loading}
      size={isDesktop ? 'default' : 'lg'}
      type="submit"
    >
      {loading && <Spinner className="mr-2 size-4" />}
      Submit
    </Button>
  );
}
