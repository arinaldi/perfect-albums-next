import { FC } from 'react';
import { RefCallBack } from 'react-hook-form';

interface Props {
  id: string;
  inputRef: RefCallBack;
  required?: boolean;
  type: 'text' | 'date' | 'email' | 'password';
}

const Input: FC<Props> = ({ id, inputRef, required, type, ...rest }) => {
  return (
    <>
      <label
        htmlFor={id}
        className="capitalize block text-sm font-medium text-gray-700 dark:text-white"
      >
        {id}
      </label>
      <input
        autoCapitalize={type === 'password' ? 'off' : 'on'}
        autoComplete={id}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
        id={id}
        ref={(e) => inputRef(e)}
        required={required}
        type={type}
        {...rest}
      />
    </>
  );
};

export default Input;
