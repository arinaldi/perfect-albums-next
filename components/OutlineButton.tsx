import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cn } from '@/utils';

const OutlineButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children, className = '', ...rest } = props;

  return (
    <button
      className={cn(
        'inline-flex min-w-[88px] items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700',
        className,
      )}
      ref={ref}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});

OutlineButton.displayName = 'OutlineButton';

export default OutlineButton;
