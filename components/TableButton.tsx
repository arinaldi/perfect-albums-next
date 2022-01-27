import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function TableButton({ children, onClick }: Props) {
  return (
    <button
      className="uppercase font-light py-1 px-2 border border-transparent text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
