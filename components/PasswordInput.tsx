import { forwardRef, InputHTMLAttributes, useReducer } from 'react';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { type FieldError } from 'react-hook-form';

import { cn } from 'lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  wrapperClassName?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { error, wrapperClassName = '', ...rest } = props;
  const [on, toggle] = useReducer((flag) => !flag, false);

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        Password
      </label>
      <div className="relative">
        <input
          autoCapitalize="off"
          autoComplete="password"
          className={cn(
            'mt-1 block w-full rounded-md shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm',
            error?.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
          )}
          id="password"
          name="password"
          ref={ref}
          required
          type={on ? 'text' : 'password'}
          {...rest}
        />
        <div
          aria-label="Show or hide password"
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 dark:text-white"
          onClick={toggle}
        >
          {on ? (
            <EyeOpenIcon className="size-5" />
          ) : (
            <EyeNoneIcon className="size-5" />
          )}
        </div>
      </div>
      {error?.message && (
        <p className="mt-1 text-sm text-red-600" id="password-error">
          {error.message}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
