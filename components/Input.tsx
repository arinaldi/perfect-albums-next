import { forwardRef, InputHTMLAttributes } from 'react';
import { type FieldError } from 'react-hook-form';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from 'utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  id: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className = '', error, id, wrapperClassName = '', ...rest } = props;
  const errorId = `${id.toLowerCase().replaceAll(' ', '')}-error`;

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={id}
        className="block text-sm font-medium capitalize text-gray-700 dark:text-white"
      >
        {id}
      </label>
      {error?.message && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-600"
          id={errorId}
        >
          <CrossCircledIcon className="size-4" />
          {error.message}
        </p>
      )}
      <input
        autoCapitalize={id === 'email' ? 'off' : 'on'}
        autoComplete={id}
        className={cn(
          'mt-1 block w-full rounded-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm',
          error?.message
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
          className,
        )}
        enterKeyHint="enter"
        id={id}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
