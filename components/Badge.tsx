import { ReactNode } from 'react';

import { cn } from 'utils';

export type BadgeVariant = 'blue' | 'gray' | 'green' | 'red';

interface Props {
  label: ReactNode;
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, string> = {
  blue: 'border-sky-200 bg-sky-50 text-sky-700',
  gray: 'border-gray-200 bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-black',
  green: 'border-green-200 bg-green-50 text-green-700',
  red: 'border-red-200 bg-red-50 text-red-700',
};

export default function Badge(props: Props) {
  const { label, variant = 'gray' } = props;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        styles[variant],
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}
