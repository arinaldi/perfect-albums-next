import { ReactNode } from 'react';
import { CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';
import { cn } from 'lib/utils';

type Variant = 'default' | 'destructive';

interface Props {
  className?: string;
  description?: string;
  title?: string;
  variant?: Variant;
}

const icons: Record<Variant, ReactNode> = {
  default: <InfoCircledIcon aria-hidden="true" className="size-4" />,
  destructive: <CrossCircledIcon aria-hidden="true" className="size-4" />,
};

export default function AppMessage({
  className = '',
  description = 'Something went wrong',
  title = 'Error',
  variant = 'destructive',
}: Props) {
  return (
    <Alert className={cn('max-w-fit', className)} variant={variant}>
      {icons[variant]}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
