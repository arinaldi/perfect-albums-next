import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: ReactNode;
  titleAction?: ReactNode
}

const Layout: FC<Props> = ({ children, title, titleAction }) => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold dark:text-white">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
