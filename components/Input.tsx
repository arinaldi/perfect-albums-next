import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  id: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, id, wrapperClassName = '', ...rest }, ref) => {
    const errorId = `${id.toLowerCase().replaceAll(' ', '')}-error`;

    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className="block text-sm font-medium capitalize text-gray-700 dark:text-white"
        >
          {id}
        </label>
        <input
          autoCapitalize={id === 'email' ? 'off' : 'on'}
          autoComplete={id}
          className={`mt-1 block w-full rounded-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm ${
            error?.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          enterKeyHint="enter"
          id={id}
          ref={ref}
          {...rest}
        />
        {error?.message ? (
          <p className="mt-1 text-sm text-red-600" id={errorId}>
            {error.message}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
