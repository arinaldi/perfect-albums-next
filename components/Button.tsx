import { FC } from 'react';

interface Props {
  label: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="py-2 px-4 border border-transparent text-sm font-bold uppercase rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
