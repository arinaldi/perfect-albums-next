import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  maxWidth?: string;
  title: ReactNode;
  titleAction?: ReactNode;
}

export default function Layout({
  children,
  maxWidth,
  title,
  titleAction,
}: Props) {
  return (
    <div className={`mx-auto p-4 ${maxWidth ?? 'max-w-7xl'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold dark:text-white">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">{children}</div>
    </div>
  );
}
