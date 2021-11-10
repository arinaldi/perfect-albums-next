import { forwardRef } from 'react';

interface Props {
  id: string;
  required?: boolean;
  type: 'text' | 'date' | 'email' | 'password';
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, required, type, ...rest }, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          className="capitalize block text-sm font-medium text-gray-700 dark:text-white"
        >
          {id}
        </label>
        <input
          autoCapitalize={id === 'password' ? 'off' : 'on'}
          autoComplete={id}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
          id={id}
          ref={ref}
          required={required}
          type={type}
          {...rest}
        />
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
