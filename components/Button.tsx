import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      className="rounded border border-transparent bg-gray-700 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
