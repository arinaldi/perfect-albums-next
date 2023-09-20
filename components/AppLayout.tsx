import { ReactNode } from 'react';

import { Children } from 'utils/types';
import { cn } from 'utils';

interface Props extends Children {
  className?: string;
  title: ReactNode;
  titleAction?: ReactNode;
}

export default function AppLayout({
  children,
  className = '',
  title,
  titleAction,
}: Props) {
  return (
    <div className={cn('mx-auto max-w-7xl px-5 py-4', className)}>
      <div className="mb-4 flex min-h-[40px] items-center justify-between">
        <h1 className="text-xl font-semibold dark:text-white sm:text-2xl">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">{children}</div>
    </div>
  );
}
