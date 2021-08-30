import { ChangeEvent, FC } from 'react';

interface Props {
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type: 'text' | 'date' | 'email' | 'password';
  value: string;
}

const Input: FC<Props> = ({ id, onChange, required, type, value }) => {
  return (
    <>
      <label
        htmlFor={id}
        className="capitalize block text-sm font-medium text-gray-700 dark:text-white"
      >
        {id}
      </label>
      <input
        autoComplete={id}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
        id={id}
        name={id}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
    </>
  );
};

export default Input;
