import { ReactNode } from 'react';
import { CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@/utils';

type Variant = 'error' | 'info';

interface Props {
  message?: string;
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  error: 'bg-red-50 text-red-800',
  info: 'bg-blue-50 text-blue-800',
};

const icons: Record<Variant, ReactNode> = {
  error: (
    <CrossCircledIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
  ),
  info: (
    <InfoCircledIcon aria-hidden="true" className="h-5 w-5 text-blue-400" />
  ),
};

export default function AppMessage({
  message = 'Something went wrong',
  variant = 'error',
}: Props) {
  return (
    <div
      className={cn('mx-auto mt-8 flex w-fit rounded-md p-4', styles[variant])}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[variant]}</div>
      <div className="ml-3 flex-1 md:flex md:justify-between">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
