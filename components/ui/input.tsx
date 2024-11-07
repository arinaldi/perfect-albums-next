import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      className={cn(
        'block h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:py-1 sm:text-sm',
        className,
      )}
      {...props}
    />
  );
};
Input.displayName = 'Input';

export { Input };
