import { ReactNode } from 'react';

import { cn } from 'lib/utils';
import { Children } from 'utils/types';

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
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">{children}</div>
    </div>
  );
}
