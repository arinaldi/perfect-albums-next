import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  maxWidth?: string;
  title: ReactNode;
  titleAction?: ReactNode;
}

export default function AppLayout({
  children,
  maxWidth,
  title,
  titleAction,
}: Props) {
  return (
    <div className={`mx-auto p-4 ${maxWidth ?? 'max-w-7xl'}`}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold dark:text-white sm:text-3xl">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">{children}</div>
    </div>
  );
}
