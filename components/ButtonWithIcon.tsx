import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  icon: ReactNode;
  onClick: () => void;
}

export default function ButtonWithIcon({ children, icon, onClick }: Props) {
  return (
    <button
      className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-900"
      onClick={onClick}
      type="button"
    >
      <span className="-ml-1 mr-1.5 h-5 w-5" aria-hidden="true">
        {icon}
      </span>
      {children}
    </button>
  );
}
