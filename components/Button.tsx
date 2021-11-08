import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      className="py-2 px-4 border border-transparent text-sm font-bold uppercase rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
