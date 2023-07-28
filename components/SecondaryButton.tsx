import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cn } from 'utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: ReactNode;
}

export default function SecondaryButton(props: Props) {
  const { className = '', label = 'Cancel', ...rest } = props;

  return (
    <button
      className={cn(
        'inline-flex min-w-[88px] items-center justify-center whitespace-nowrap rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/10 dark:text-white dark:ring-gray-900 dark:hover:bg-white/20',
        className,
      )}
      type="button"
      {...rest}
    >
      {label}
    </button>
  );
}

// className="  hover:bg-white/20"
