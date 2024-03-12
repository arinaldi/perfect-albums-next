import { ReactNode } from 'react';
import { CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Variant = 'default' | 'destructive';

interface Props {
  className?: string;
  description?: string;
  title?: string;
  variant?: Variant;
}

const iconClassName = '-mt-1 size-4';
const icons: Record<Variant, ReactNode> = {
  default: <InfoCircledIcon aria-hidden="true" className={iconClassName} />,
  destructive: (
    <CrossCircledIcon aria-hidden="true" className={iconClassName} />
  ),
};

export default function AppMessage({
  className = '',
  description = 'Something went wrong',
  title = 'Error',
  variant = 'destructive',
}: Props) {
  return (
    <Alert className={className} variant={variant}>
      {icons[variant]}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
