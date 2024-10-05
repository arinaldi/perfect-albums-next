'use client';
import { useFormStatus } from 'react-dom';

import { Button, ButtonProps } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { useMediaQuery } from '@/hooks/media-query';
import { cn } from '@/lib/utils';

interface Props extends ButtonProps {
  className?: string;
  submitting?: boolean;
}

export default function SubmitButton({
  children,
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
      className={cn(className, 'relative')}
      disabled={props.disabled || loading}
      size={isDesktop ? 'default' : 'lg'}
      type="submit"
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className="size-4" />
        </span>
      )}
      <span
        className={cn(loading ? 'invisible' : '', 'flex items-center gap-2')}
      >
        {children}
      </span>
    </Button>
  );
}
