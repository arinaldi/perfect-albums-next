import { CircleXIcon, InfoIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icon } from '@/utils/types';

type Variant = 'default' | 'destructive';

interface Props {
  className?: string;
  description?: string;
  title?: string;
  variant?: Variant;
}

const icons: Record<Variant, Icon> = {
  default: InfoIcon,
  destructive: CircleXIcon,
};

export default function AppMessage({
  className = '',
  description = 'Something went wrong',
  title = 'Error',
  variant = 'destructive',
}: Props) {
  const IconComponent = icons[variant];

  return (
    <Alert className={className} variant={variant}>
      <IconComponent aria-hidden="true" className="-mt-1 size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
