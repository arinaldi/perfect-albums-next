import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const TableButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TableButton;
