import { forwardRef } from 'react';

interface Props {
  id: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  type: 'text' | 'date' | 'email';
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      maxLength,
      minLength,
      required,
      type,
      wrapperClassName = '',
      ...rest
    },
    ref,
  ) => {
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
          enterKeyHint="enter"
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          ref={ref}
          required={required}
          type={type}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
