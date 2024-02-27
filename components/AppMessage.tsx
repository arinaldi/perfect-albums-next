import { ReactNode } from 'react';
import { Info, XCircle } from 'lucide-react';

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
  default: <Info aria-hidden="true" className="size-4" />,
  destructive: <XCircle aria-hidden="true" className="size-4" />,
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
